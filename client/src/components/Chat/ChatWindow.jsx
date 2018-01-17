import React from 'react';
import { Segment } from 'semantic-ui-react';

import ChatHeader from './ChatHeader.jsx';
import ChatFriendSearch from './ChatFriendSearch.jsx';
import ChatFeed from './ChatFeed.jsx';
import ChatMessageInput from './ChatMessageInput.jsx';
import ChatButton from './ChatButton.jsx';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: null,
    }

    this.onClose = this.onClose.bind(this);
    this.onFriendSelect = this.onFriendSelect.bind(this);
  }

  onClose() {
    //tidy up sockets
  }

  onFriendSelect() {
    //start new chat session with selected friend
  }

  render() {

    let chatHeaderText, 
        chatFriendSearch, 
        chatMessageInput;

    if (this.state.friend) {
      chatHeaderText = this.state.friend.name;
      chatFriendSearch = null;
      chatMessageInput = <ChatMessageInput />
    } else {
      chatHeaderText = 'New Message';
      chatFriendSearch = <ChatFriendSearch onSelect={this.onFriendSelect}/>
      chatMessageInput = null;
    }

    return (
      <Segment >
        <ChatHeader text={chatHeaderText} onClose={this.onClose} />
        {chatFriendSearch}
        <ChatFeed />
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