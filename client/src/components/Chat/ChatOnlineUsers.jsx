import React from 'react';
import { List } from 'semantic-ui-react';

const ChatOnlineUser = (prop) => (
    <List.Item>
      <Image avatar src={props.photo} />
      <List.Content>
        <List.Header as='a'>{props.name}</List.Header>
      </List.Content>
    </List.Item>
);

const ChatOnlineUsers = (props) => {
  return (
    <div className="chatonlineusers" >
     <List>
        {props.users.map((user) => (
          <ChatOnlineUser key={user.username} user={user} />
        ))}
      </List>
    </div>
  );
}

export default ChatOnlineUsers;