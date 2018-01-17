import React from 'react';
import { Item } from 'semantic-ui';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: null,
    }

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    //tidy up sockets
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
      chatFriendSearch = <ChatFriendSearch />
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