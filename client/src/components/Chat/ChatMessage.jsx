import React from 'react';
import { Feed } from 'semantic-ui-react';
import moment from 'moment';


const ChatMessage = (props) => {

  return (
    <Feed.Event>
      <Feed.Label image='https://semantic-ui.com/images/avatar/large/elliot.jpg' />
      <Feed.Content content={props.message} />
    </Feed.Event>
  );
}

export default ChatMessage;