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

    return (
      <span>
        {!this.props.signedIn 
        ? <div className="navbar"></div>
        : <div className='navbar navbar--loggedIn'>
            <div className='navbar-searchLogoContainer'>
              
              <img className="navbar-logo" src="/images/rbooktransparent.png"></img>
             
              <SearchBar 
                size='large'
                className="navbar-searchBar"
                loggedInUser={this.props.name}/>
            </div>
            <div className="navbar-menuItemsContainer">
              <ChatWindow 
                className='navbar-menuItems navbar-menuItems--icon' 
                userId={this.props.userId}
                username={this.props.name} />
              <div className='navbar-menuItems navbar-menuItems--icon'>
                <Popup 
                  trigger={<Button icon='users'/>}
                  content={<FriendRequestList 
                    userId={this.props.userId} 
                    friendRequests={this.props.friendRequests}
                    refreshFriendRequests={this.props.refreshFriendRequests}
                  />}
                  on='click'
                  position='bottom center'
                />
              </div>
              <Link 
                className='navbar-menuItems navbar-menuItems--text'
                to={feedPath}>
                Feed
              </Link>
              <Link 
                className='navbar-menuItems navbar-menuItems--text'
                to={profilePath}>
                Profile
              </Link>
              <Link
                className='navbar-menuItems navbar-menuItems--text'
                onClick={ () => this.props.updateLoginState(false) }
                to='/'>
                Log Out
              </Link>

            </div>
          </div>
        }
      </span>
    );
  }
}

export default Header;
