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

  handlePostInput(event) {
    const value = event.target.value;

    this.setState({
      postText: value
    });
  }

  onDrop(accepted, rejected) {
    this.setState(
      { accepted, rejected }
    ); 
  }

  createPostNew() {
    let postInput = this.state.postText;
    let authorId = this.props.userId;
    let hasImage = Boolean(this.state.accepted[0]);

    let options = null;
    let endpoint = '/api/createPost';
    let basicPostBody = {
      'postText': postInput,
      'authorId': authorId
    } 

    let imagePostBody;

    if (hasImage) {
      endpoint='/api/uploadImagePost';

      // Define Post body

      imagePostBody = new FormData();
      imagePostBody.append('sharedImage', this.state.accepted[0]);
      imagePostBody.append('postText', postInput);
      imagePostBody.append('authorId', authorId);

      // let imageName = this.state.accepted[0].name;
      let contentType =  this.state.accepted[0].type;

      // console.log('image name', imageName);
      // console.log('content type name', contentType);
      let options = {
        headers: {
          'Content-Type': contentType
        }
      }
    } 

    axios.post(endpoint, hasImage ? imagePostBody : basicPostBody, hasImage && options)
      .then(function (result) {
        console.log(result);
      })
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
              type="text" 
              onChange={this.handlePostInput.bind(this)}
            />
            <div className="createPostButtonRow">
              <Button 
                className="createPostButton"
                onClick={this.createPostNew.bind(this)}>
                Post
              </Button>
              {/*<Button className="cancelPostButton">Cancel</Button>*/}
            </div>
          </form>
        </Card>
      </div>
    )
  }
}

export default CreatePost;
