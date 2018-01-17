import React from 'react';
import { Button } from 'semantic-ui-react';

const ChatButton = (props) => (
  <Button 
    className='chatbutton' 
    icon='comments'
    onClick={this.props.onClick} >
  </Button> 
);

export default ChatButton;