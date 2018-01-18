import React from 'react';
import { Segment } from 'semantic-ui-react';

import ChatHeader from './ChatHeader.jsx';
import ChatFriendSearch from './ChatFriendSearch.jsx';
import ChatFeed from './ChatFeed.jsx';
import ChatMessageInput from './ChatMessageInput.jsx';
import ChatButton from './ChatButton.jsx';
import io from 'socket.io-client';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: null,
      socket: null,
      messages: []
    }

    this.onClose = this.onClose.bind(this);
    this.onFriendSelect = this.onFriendSelect.bind(this);
  }

  onClose() {
    //tidy up sockets
  }

  onFriendSelect(friend) {
    const socket = io();

    socket.on('connect', function () {
      socket.emit('login', { username: this.props.username} );
    });

    this.setState({
      socket: socket
    });

    this.state.friend = friend;
  }

  render() {

    let chatHeaderText, 
        chatFriendSearch, 
        chatMessageInput;

    if (this.state.friend) {
      console.log('Friend is null');
      chatHeaderText = this.state.friend.name;
      chatFriendSearch = null;
      chatMessageInput = <ChatMessageInput socket={this.state.socket}/>
    } else {
      chatHeaderText = 'New Message';
      chatFriendSearch = <ChatFriendSearch onSelect={this.onFriendSelect}/>
      chatMessageInput = null;
    }

    return (
      <Segment >
        <ChatHeader text={chatHeaderText} onClose={this.onClose} />
        {chatFriendSearch}
        <ChatFeed messages={this.state.messages}/>
        {chatMessageInput} 
      </Segment>
    )
  }
}

ChatWindow.Header = ChatHeader;
ChatWindow.FriendSearch = ChatFriendSearch;
ChatWindow.Feed = ChatFeed;
ChatWindow.MessageInput = ChatMessageInput;
ChatWindow.Button = ChatButton;

export default ChatWindow;