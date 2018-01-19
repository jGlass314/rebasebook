import React from 'react';
import { Button, MenuItem } from 'semantic-ui-react';


class ChatButton extends React.Component {
  constructor(props) {
    super(props);


    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.handleClick();
  }
  render() {

    return (
      <Button 
        className='chatbutton' 
        icon='comments'
        onClick={this.handleClick} >
      </Button> 
    );
  }
}

export default ChatButton;