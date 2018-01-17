import React from 'react';
import { TextArea } from 'semantic-ui-react';

class ChatMessageInput extends React.Component {

  onInput(e, {value}) {
    console.log('onInput ', value);
  }

  onChange(e, {value}) {
    console.log('onChange ', value);
  }

  render() {

    return (
      <TextArea autoHeight value={this.state.text} onChange={this.props.onChange} />
    );
  }
}

export default ChatMessageInput;