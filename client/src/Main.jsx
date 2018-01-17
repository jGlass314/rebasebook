import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './index.jsx';
import Feed from './components/Feed.jsx';
import PostList from './components/PostList.jsx';
import Profile from './components/Profile.jsx';
import Header from './components/Header.jsx';
import SignIn from './components/SignIn.jsx';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      newUsername: '',
      signedIn: '',
      name: '',
      picture_url: '',
      userId: null
    }
  }
  getProfile(user) {
    console.log('made it here', user);
    axios.get(`/${user}`) 
    .then((res) => {
      // console.log('res: ', res.data[0]);
      this.setState({
        view: 'profile',
        name: res.data[0].first_name + ' ' + res.data[0].last_name,
        picture_url: res.data[0].picture_url,
        username: res.data[0].username,
        userId: res.data[0].id
      })

    })
    .catch((err) => {
      console.error('err: ', err);
    })
  }

  getUsername(username) {
    // console.log(username);
    this.setState({
      username: username
    })
  }
  getNewUsername(newUsername) {
    // console.log(newUsername);
    this.setState({
      username: newUsername
    })
  }
  getSignedIn(signedIn) {
    // console.log(signedIn);
    this.setState({
      signedIn: signedIn
    })
  }

  render() {
    return (
      <main>
        <div>
        <Header 
          getProfile={this.getProfile.bind(this)} 
          name={this.state.username} 
          signedIn={this.state.signedIn} 
          getSignedIn={this.getSignedIn.bind(this)}
        />
        <Switch>
          <Route 
            exact path='/'
            component={() => 
              <SignIn 
                getUsername={this.getUsername.bind(this)}
                getNewUsername={this.getNewUsername.bind(this)}
                getProfile={this.getProfile.bind(this)}
                getSignedIn={this.getSignedIn.bind(this)}
              /> } 
          />
          <Route 
            path='/:username/feed' 
            userId={this.state.userId}
            username={this.state.username}
            component={Feed} />
          <Route 
            path='/login' 
            component={() =>
              <SignIn 
                getUsername={this.getUsername.bind(this)}
                getNewUsername={this.getNewUsername.bind(this)}
                getProfile={this.getProfile.bind(this)}
                getSignedIn={this.getSignedIn.bind(this)}
              />
            } 
          />
          <Route 
            path='/:username/profile/:friendname'
            component={Profile} />
        </Switch>
        </div>
      </main>
    )
  }
  
}

export default Main;

