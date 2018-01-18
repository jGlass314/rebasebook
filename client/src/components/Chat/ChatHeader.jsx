import React from 'react';
import { Button } from 'semantic-ui-react';

const ChatHeader = (props) => (
  <div className='chatHeader'>
    {props.text}
    <Button className='chatCloseButton' floated='right' icon='close' onClick={props.onClose}/>
  </div>
)

export default ChatHeader;