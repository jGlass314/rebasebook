import React from 'react';
import { Segment, Container, Popup, Button } from 'semantic-ui-react';

import ChatHeader from './ChatHeader.jsx';
import ChatFriendSearch from './ChatFriendSearch.jsx';
import ChatFeed from './ChatFeed.jsx';
import ChatMessageInput from './ChatMessageInput.jsx';
import ChatHistory from './ChatHistory.jsx';
import ChatOnlineUsers from './ChatOnlineUsers.jsx';
import ChatButton from './ChatButton.jsx';
import io from 'socket.io-client';
 

const chatHistory = [
  {
    chatId: 1,
    name: 'Mike Sutherland',
    photo: 'https://semantic-ui.com/images/avatar/large/elliot.jpg',
    text: 'Hey, how are things going with you'
  },
  {
    chatId: 2,
    name: 'Ginger',
    photo: 'https://semantic-ui.com/images/avatar/large/elliot.jpg',
    text: 'Hey, how are things going with you'
  },
  {
    chatId: 3,
    name: 'Josh',
    photo: 'https://semantic-ui.com/images/avatar/large/elliot.jpg',
    text: 'Hey, how are things going with you'
  },
  {
    chatId: 4,
    name: 'Ace',
    photo: 'https://semantic-ui.com/images/avatar/large/elliot.jpg',
    text: 'Hey, how are things going with you'
  }
];

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: null,
      socket: null,
      messages: [],
      user: props.username,
      displayChat: false,
      onlineUsers: [],
      chatHistory: chatHistory
    }

    console.log('Current User ', props.username);

    this.onClose = this.onClose.bind(this);
    this.onFriendSelect = this.onFriendSelect.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    this.connect();

  }

  getChatHistory() {
    http.get('/chats')
  }

  connect() {
    const socket = io();

    socket.on('connect', () => {
      socket.emit('login', { username: this.props.username });
    });

    socket.on('message', (message) => {

      if (!this.state.friend) {
        this.setState({
          friend: { 
            username: message.from,
            name: message.from 
          },
          displayChat: true
        });
      }
      
      let messages = this.state.messages;
      console.log('Message Received ', message);
      messages.push(message.message);
      this.setState({
        messages: messages
      })
    });

    socket.on('onlineusrs', (data) => {
      this.setState({
        onlineUsers: data
      });
    });

    socket.on('disconnect', (reason) => {
      console.log(`Connection to Chat server was closed, received message "${reason}", attempting to recconect`);
      socket.open();
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log(`Connection to Chat server reestablished after ${attemptNumber} attempts`);
    });

    this.setState({
      socket: socket
    });
  }

  newMessage() {
    this.setState({
      displayChat: true
    })
  }

  onClose() {
    //tidy up sockets
    if (this.state.socket) {
      this.state.socket.close();
    }
    
    this.setState({
      socket: null,
      friend: null,
      messages: [],
      displayChat: false
    });
  }

  onFriendSelect(friend) {

    if (!this.state.socket) {
      this.connect();
    }

    console.log('onFriendSelect called');

    this.setState({
      friend: friend
    });
  }

  sendMessage(message) {
    console.log('Sending Message: ', message);
    this.state.socket.emit('message', {
      to: this.state.friend.username,
      message: message,
      from: this.props.username
    });

    let messages = this.state.messages;
    messages.push(message);

    this.setState({
      messages: messages
    });
  }
  renderOnlineUsers(users) {
    return <ChatOnlineUsers users={users} />
  }

  renderChatList(active) {
    return false;
  }
  renderChatWindow(active) {

    let chatHeaderText,
      chatFriendSearch,
      chatMessageInput;

    if (this.state.friend) {
      chatHeaderText = this.state.friend.name;
      chatFriendSearch = null;
      chatMessageInput = <ChatMessageInput onSubmit={this.sendMessage} socket={this.state.socket} />
    } else {
      chatHeaderText = 'New Message';
      chatFriendSearch = <ChatFriendSearch onSelect={this.onFriendSelect} />
      chatMessageInput = null;
    }

    return active && (
      <div className='chatcontainer'>
        <Segment >
          <ChatHeader text={chatHeaderText} onClose={this.onClose} />
          {chatFriendSearch}
          <ChatFeed messages={this.state.messages} />
          {chatMessageInput}
        </Segment>
      </div>
    );
  }

  render() {

    return (
      <div className='chatcomponent' >
        <div className='chatbutton' >
          <Popup
            trigger={<Button icon='comments'/>}
            content={<ChatHistory newMessage={this.newMessage} chats={this.state.chatHistory} />}
            on='click'
          />          
        </div>
        {this.renderChatList(this.state.displayList)}
        {this.renderChatWindow(this.state.displayChat)}
      </div>
    )
  }
}

ChatWindow.Header = ChatHeader;
ChatWindow.FriendSearch = ChatFriendSearch;
ChatWindow.Feed = ChatFeed;
ChatWindow.MessageInput = ChatMessageInput;
ChatWindow.Button = ChatButton;

export default ChatWindow;

/*          
       
        {this.renderOnlineUsers(this.state.onlineUsers)}

*/

/*
<ChatHeader text={chatHeaderText} onClose={this.onClose} />
  <ChatFriendSearch onSelect={this.onFriendSelect} />
  <ChatFeed messages={this.state.messages} />
        { chatMessageInput } */