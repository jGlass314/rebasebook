import React from 'react';
import { Button, Popup, Icon, List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class FriendRequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendRequests: this.props.friendRequests,
      completed: []
    }
  }

  componentWillUnmount() {
    // Right before the component unmounts, clean up the completed friendships
    // by refreshing the friendrequest list. 
    this.props.refreshFriendRequests(this.props.userId);
  }

  addFriend(friendId) {
    let data = {
      userId: this.props.userId,
      friendId: friendId
    }

    axios.post('/api/friendship', data)

      .then((response) => {
        let completed = (this.state.completed || []).concat([friendId]);
        this.setState({
          completed: completed
        })
      })
      .catch((error) => {
        console.error(error);
      })
  } 

  render() {
    let requestItems = [];

    this.props.friendRequests && this.props.friendRequests.forEach((request) => {
      let userProfileLink = `/profile/${request.username}`;
      let friendId = request.id;

      // If the friendID is in the completed bucket, show inactive button
      let completed = this.state.completed;
      let isCompleted = completed.indexOf(friendId) !== -1;

      requestItems.push(
        <List.Item key={friendId}>
          <Image avatar src={request.picture_url} />
          <List.Content>
            <List.Description><Link to={userProfileLink}>{request.first_name} {request.last_Name}</Link> wants to be friends</List.Description>
            <Button 
              toggle
              active={!isCompleted}
              color={isCompleted ? null : 'green'}
              size='mini'
              onClick={() => this.addFriend(friendId)}>
              {isCompleted ? '✓ friends' : 'accept'}
            </Button>
          </List.Content>
        </List.Item>
      );
    })

    let defaultMessage=<List.Item key={0}>No new friend requests</List.Item>;
    let hasRequests = requestItems && requestItems.length > 0;

    return (
      <List>
        {hasRequests
          ? requestItems
          : defaultMessage}
      </List>);
  }
}

export default FriendRequestList;