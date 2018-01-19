import React from 'react';
import { Button, Popup, Icon, List, Image } from 'semantic-ui-react';
import SearchBar from './Search.jsx';
import ChatWindow from './Chat/ChatWindow.jsx';
import { Link, Redirect } from 'react-router-dom';
import FriendRequestList from './FriendRequestList.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const profilePath = `/profile/${this.props.name}`;
    const feedPath = '/' + this.props.name + '/feed';

    const hasFriendRequests = false;

    let icon = hasFriendRequests
      ? <Icon color='yellow' name='users' />
      : <Icon disabled name='users' />

    return (
      <div className="global-header">
        {this.props.signedIn && 
          <div>
            <Image className="logo" src="/images/rbooktransparent.png"></Image>
            <SearchBar 
              className="searchBarClass"
              loggedInUser={this.props.name}/>
            <div className="header-btn">
              <span className='friend-requests'>
                <Popup 
                  trigger={icon}
                  content={<FriendRequestList 
                    userId={this.props.userId} 
                    friendRequests={this.props.friendRequests}
                    refreshFriendRequests={this.props.refreshFriendRequests}
                  />}
                  on='click'
                  position='bottom center'
                />
              </span>
              <Link
                onClick={ () => this.props.updateLoginState(false) }
                to='/login'>
                <button className="btn">
                  <span className="headerFont">Log Out</span>
                </button>
              </Link>
              <Link to={profilePath}>
                <button className="btn">
                  <span className="headerFont">Profile</span>
                </button>
              </Link>
              <Link to={feedPath}>
                <button className="btn">
                  <span className="headerFont">Feed</span>
                </button>
              </Link>
              <ChatWindow userId={this.props.userId} username={this.props.name} />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Header;
