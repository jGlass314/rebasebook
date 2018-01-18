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
      signedIn: false,
      username: null,
      name: null,
      picture_url: null,
      userId: null,
      friendRequests: []
    }
  }

  setBasicUserFields(userData) {
    
    this.setState({
      view: 'profile',
      name: userData.first_name + ' ' + userData.last_name,
      picture_url: userData.picture_url,
      username: userData.username,
      userId: userData.id
    })

    this.getFriendRequests(userData.id);
  }

  setUsername(username) {
    this.setState({
      username: username
    })
  }

  updateLoginState(newState) {
    let loginStatus = Boolean(newState);

    // clear state on log-out
    if (loginStatus === false) {
      this.setState({
        signedIn: false,
        username: null,
        name: null,
        picture_url: null,
        userId: null
      })
    } else {
      this.setState({
        signedIn: true
      });
    }
  }

  getFriendRequests(userId) {
    let params = {
      userId: userId,
      type: 'requests'
    }

    axios.get('/api/friend_list', {params: params}) 
      .then((results) => {
        this.setState({
          friendRequests: results.data
        });
      })
      .catch((err) => {
        console.error('err: ', err);
      })
  }

  render() {
    return (
      <main>
        <div>
        <Header 
          userId={this.state.userId}
          name={this.state.username} 
          signedIn={this.state.signedIn} 
          updateLoginState={this.updateLoginState.bind(this)}
          friendRequests={this.state.friendRequests}
        />
        <Switch>
          <Route 
            exact path='/'
            render={() => 
              <SignIn 
                getUsername={this.setUsername.bind(this)}
                updateLoginState={this.updateLoginState.bind(this)}
                setBasicUserFields={this.setBasicUserFields.bind(this)}
              /> } 
          />
          <Route 
            exact path='/login' 
            render={() =>
              <SignIn 
                getUsername={this.setUsername.bind(this)}
                updateLoginState={this.updateLoginState.bind(this)}
                setBasicUserFields={this.setBasicUserFields.bind(this)}
              />
            } 
          />
          <Route
            path='/:username/feed' 
            render={(routeProps) => 
              <Feed 
                {...routeProps}
                userId={this.state.userId}
                username={this.state.username} 
              /> }
          />
          <Route 
            path='/profile/:friendname'
            render={(routeProps) =>
              <Profile 
                {...routeProps}
                loggedInUserId={this.state.userId}
                loggedInUsername={this.state.username}
              />
            } 
          />
          </Switch>
        </div>
      </main>
    );
  }
}

export default Main;
