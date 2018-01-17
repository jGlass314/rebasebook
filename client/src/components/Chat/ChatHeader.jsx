import React from 'react';

const ChatHeader = (props) => (
  <div className='chatheader'>
    {props.text}
    <Button icon='close' onClose={props.onClose}/>
  </div>
)

export default ChatHeader;