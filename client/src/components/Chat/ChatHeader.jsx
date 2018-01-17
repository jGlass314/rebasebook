import React from 'react';
import { Button } from 'semantic-ui-react';

const ChatHeader = (props) => (
  <div className='chatheader'>
    {props.text}
    <Button icon='close' onClick={props.onClose}/>
  </div>
)

export default ChatHeader;