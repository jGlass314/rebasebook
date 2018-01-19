import React from 'react';
import { List, Image, Divider } from 'semantic-ui-react';

const ChatHistoryMessage = (props) => (
  <List.Item>
    <Image avatar src={props.chat.photo} />
    <List.Content>
      <List.Header>{props.chat.name}</List.Header>
      <List.Description>{props.chat.text}</List.Description>
    </List.Content>
  </List.Item>
);

const ChatHistory = (props) => {
  return (
    <div>
      <List>
        {props.chats.map((chat) => (
          <ChatHistoryMessage key={chat.chatId} chat={chat} />
        ))}
      </List>
      <Divider horizontal />
      <a onClick={props.newMessage}>New Message</a>
    </div>
  );
}

export default ChatHistory;