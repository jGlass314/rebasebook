import React from 'react';
import { Card, Icon, Button, Label, Comment, Input } from 'semantic-ui-react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
      accepted: [],
      rejected: []
    }
  }

  onDrop(accepted, rejected) {
    console.log(accepted, rejected);
    this.setState(
      { accepted, rejected }
    ); 
  }

  createImagePost() {
    var image = new FormData();
    image.append('sharedImage', this.state.accepted[0]);
    image.append('hello', 'hello');

    let imageName = this.state.accepted[0].name;
    let contentType =  this.state.accepted[0].type;
    console.log('image name', imageName);
    console.log('content type name', contentType);

    var options = {
      headers: {
          'Content-Type': contentType
      }
    }

    axios.post('/api/uploadImage', image, options)
    .then(function (result) {
      console.log(result);
      //var signedUrl = result.data.signedUrl;
      
      // var options = {
      //   headers: {
      //     'Content-Type': file.type
      //   }
      // };

      // return axios.put(signedUrl, file, options);
    })
    // .then(function (result) {
    //   console.log(result);
    // })
    .catch(function (err) {
      console.log(err);
    });
  }


  createPost() {
    let postInput = document.getElementById('postInput').value.replace(`'`, `''`);
    let username = this.props.name;
    document.getElementById('postInput').value = '';
    
    this.setState({
      postText: postInput
    })

    this.createImagePost();

    // axios.post(`/api/${username}/posts`, { 'text': postInput })
    //   .then((res) => {
    //     this.props.getAllPosts ? this.props.getAllPosts() : this.props.renderNewPost(this.props.name);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }
  sendPostText(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="createPostBody">
        <Card fluid>
          <div className="createPostHeader">
          <h2 className="createPostLabel">Create New Post</h2>
          </div>
          <form onSubmit={this.sendPostText.bind(this)}>
            <Dropzone 
              className='post-imageSelect'
              acceptClassName='post-imageSelect post-imageSelect-accepted'
              accept='image/*'
              onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
            <aside>
              <h2>Dropped files</h2>
              <ul>
                {
                  this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
              </ul>
            </aside>
            <Input 
              className="createPostInput"
              id="postInput"
              type="text" 
            />
            <div className="createPostButtonRow">
              <div></div>
              <div></div>
              <Button className="createPostButton" onClick={this.createPost.bind(this)}>Post</Button>
              <Button className="cancelPostButton">Cancel</Button>
            </div>
          </form>
        </Card>
      </div>
    )
  }
}

export default CreatePost;