import React from 'react';
import { Button, Popup, Icon, List, Image } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import FriendRequestList from './FriendRequestList.jsx';
import SearchBar from './Search.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePath: '',
      feedPath: '',
      redirectProfile: false,
      // username: window.location.pathname.substring(1, window.location.pathname.indexOf('/feed'))
    }
  }

  getUserProfile(user) {
    this.props.getProfile(user);
  }



  setSignedOut() {
    this.props.getSignedIn(false);
  }

  render() {
    const profilePath = `/profile/${this.props.name}`;
    const feedPath = '/' + this.props.name + '/feed';

    const hasFriendRequests = false;

    let icon = hasFriendRequests
      ? <Icon color='yellow' name='users' />
      : <Icon disabled name='users' />

    let friendRequestList=<span>hi</span>

    return (
      <div className="global-header">
        {(this.props.signedIn) && 
          <div>
            <Image className="logo" src="/images/rbooktransparent.png"></Image>
            <SearchBar 
              className="searchBarClass"
              getUserProfile={this.getUserProfile.bind(this)} 
              loggedInUser={this.props.name}/>
            <div className="header-btn">
              <span className='friend-requests'>
                <Popup 
                  trigger={icon}
                  content={<FriendRequestList userId={this.props.userId} friendRequests={this.props.friendRequests}/>}
                  on='click'
                  position='bottom center'
                />
              </span>
              <Link onClick={this.setSignedOut.bind(this)} to='/login'><button className="btn"><span className="headerFont">Log Out</span></button></Link>
              <Link to={profilePath}><button className="btn"><span className="headerFont">Profile</span></button></Link>
              <Link to={feedPath}><button className="btn"><span className="headerFont">Feed</span></button></Link>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Header;
