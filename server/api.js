const route = require('express').Router();
const db = require('../database-posgtres/index.js');


const api = {

  user: {

    getProfile: function (req, res) {
      db.searchSomeone(req.params.user, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          console.log('success: ', data);
          res.status(200).json(data);
        }
      });
    },

    getProfilePage: function(req, res) {
      var username = req.params.username;
      db.getProfilePageInfo(username, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          // console.log('data.......', data['0'].user_data.work);
          res.status(200).json(data);
        }
      });
    },

    getLiked: function (req, res) {
      console.log('Getting number of personal likes!');
      // console.log('Getting likes for post with this text', req.query.text);
      db.getPersonalLikeAmount(req.params.username, req.query.text, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          console.log('Successfully got personal like count', data);
          res.status(200).json(data);
        }
      })
    },

    getLikers: function (req, res) {
      console.log('Getting all likers!');

      db.getLikers(req.query.text, (err, data) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).json(data);
        }
      })
    },

    getUser: function(req, res) {
      console.log('inside get username');
      var username = req.params.username;
      if (username !== 'favicon.ico') {
        db.getUser(username, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            // console.log('data from /username route', data);
            res.status(200).json(data);
          }
        })
      }
    },

    getUsername: function(req, res) {
      // console.log('Querying by first and last name');
      db.getUsername(req.params.firstname, req.params.lastname, (err, data) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).json(data);
        }
      })
    },

    createUser: function(req, res) {
      var username = req.params.username;
      if (username !== 'favicon.ico') {
        var newUserData = {
          username: req.body.username,
          pictureUrl: req.body.pictureUrl,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
        db.addUser(newUserData, (err, data) => {
          if (err) {
            res.status(500).json(err);
          } else {
            // res.status(200).json(data);
            db.addNewUserProfileInfo(newUserData.username, (err, data) => {
              if (err) {
                res.status(404).send(err);
              } else {
                res.status(200).json(data);
              }
            });
          }
        })
      }
    },

    addFriend: function(req, res) {
      var username = req.params.username;
      var friendToAdd = req.params.friendToAdd;
      db.addFriend(username, friendToAdd, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(data);
        }
      });
    },

    getFriendsList: function(req, res) {
      var username = req.params.username;
      var otherUsername = req.params.otherUsername;
      db.getFriendsList(otherUsername, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(data);
        }
      });
    },

    removeFriend: function(req, res) {
      var username = req.params.username;
      var friendToRemove = req.params.friendToRemove;
      db.removeFriend(username, friendToRemove, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(data);
        }
      });
    },

    updateProfile: function(req, res) {
      var username = req.params.username;
      var changes = req.body;
      console.log('sending request to database...');
      db.updateProfilePageInfo(username, changes, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(data);
        }
      });
    }

  },

  users: {

    getUsers: function (req, res) {
      // console.log("GETTING ALL FRIENDS POSTS");
      db.getAllUsers((err, data) => {
        // console.log("Error", err, "data", data);
        if (err) {
          console.log('This is my error', err);
          res.sendStatus(404);
        } else {
          // console.log('This is my data', data);
          res.status(200).json(data);
        }
      });
    }
  },

  post: {

    createPost: function(req, res) {
      // console.log(req.params.username);
      // console.log(req.body.text);   
      db.createPost(req.params.username, req.body.text, (err, data) => {
        if (err) {
          console.log(res);
          console.log('This is my error', err);
          res.sendStatus(404);
        } else {
          res.status(200).json(data);
        }
      })
    },

    getAuthor: function(req, res) {
      db.getPostAuthor(req.query.text, (err, data) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).json(data);
        }
      })
    },

    unlikePost: function (req, res) {
      console.log('Are you unliking');
      // console.log(req.params.author);
      // console.log(req.query.text);
      // console.log(req.query.username);
      db.unlikePost(req.params.author, req.query.text, req.query.username, (err, data) => {
        if (err) {
          console.log(res);
          console.log('This is my error', err);
          res.sendStatus(404);
        } else {
          console.log('This is my data', data);
          res.status(200).json(data);
        }
      })
    },

    likePost: function(req, res) {
      console.log('Are you liking');
      // console.log(req.params.author);
      // console.log(req.body.text);
      // console.log(req.body.username)
      db.likePost(req.params.author, req.body.text, req.body.username, (err, data) => {
        if (err) {
          console.log(res);
          console.log('This is my error', err);
          res.sendStatus(404);
        } else {
          console.log('This is my data', data);
          res.status(200).json(data);
        }
      })
    },

    getNumLikes: function (req, res) {
      console.log('Getting number of likes!');
      // console.log('Getting likes for post with this text', req.query.text);
      db.getLikeAmount(req.query.text, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          console.log('Successfully got like count', data);
          res.status(200).json(data);
        }
      })
    },
  },

  posts: {

    getPosts: function (req, res) {
      // console.log("getting all posts");
      db.getAllPosts((err, data) => {
        // console.log("Error", err, "data", data);
        if (err) {
          console.log('This is my error', err);
          res.sendStatus(404);
        } else {
          // console.log('This is my data', data);
          res.status(200).json(data);
        }
      })
    },
      
    getUserPosts: function(req, res) {
      // console.log('username...', req.params.certainUser);
      db.getUserPosts(req.params.certainUser, (error, data) => {
        if (error) {
          console.log(`error retrieving ${req.params.certainUser}'s posts`, error);
        } else {
          console.log('data....', data);
          res.status(200).json(data);
        }
      });
    },

    getFriendsPosts: function (req, res) {
      console.log("GETTING ALL FRIENDS POSTS", req.params.username);
      db.findPostsByFriends(req.params.username, (err, data) => {
        // console.log("Error", err, "data", data);
        if (err) {
          console.log('This is my error', err);
          res.sendStatus(404);
        } else {
          console.log('This is my data', data);
          res.status(200).json(data);
        }
      })
    },

    getNonFriendsPosts: function (req, res) {
      // console.log("GETTING ALL NON FRIENDS POSTS");
      // console.log('NON FRIENDS USERNAME', req.params.username)
      db.findPostsByNonFriends(req.params.username, (err, data) => {
        // console.log("Error", err, "data", data);
        if (err) {
          console.log('This is my error', err);
          res.sendStatus(404);
        } else {
          // console.log('This is my data', data);
          res.status(200).json(data);
        }
      })
    }
  }
};


//USER
route.get('/:username/friendsList/:otherUsername', api.user.getFriendsList); // get a friends friend list
route.get('/:firstname/:lastname', api.user.getUsername); //gets the username of a user by first name, last name
route.get('/likers', api.user.getLikers); // get all likers of a particular user
route.get('/:username/likes', api.user.getLiked); //get liked users of user
route.get('/:username/profilePage', api.user.getProfilePage); // get profilePage info for user
route.get('/:username/profile/:user', api.user.getProfile); //get profile of a specific user
route.get('/:username', api.user.getUser); //gets a user

route.post('/:username/addFriend/:friendToAdd', api.user.addFriend); //add friend to user
route.post('/:username/removeFriend/:friendToRemove', api.user.removeFriend); //remove friend from user's friends list
route.post('/:username', api.user.createUser); //creates a new user

route.patch('/:username/updateProfile', api.user.updateProfile); //update current user's profile

//USERS
route.get('/search/users', api.users.getUsers); //get all users

//POST
route.get('/likes', api.post.getNumLikes); // get number of likes
route.get('/:username/post/author', api.post.getAuthor); // gets the auther of a post
route.post('/likes/:author', api.post.likePost); //like a post
route.post('/:username/posts', api.post.createPost); // create new post
route.delete('/likes/:author', api.post.unlikePost); //unlike a post

//POSTS
route.get('/:username/posts/friends', api.posts.getFriendsPosts); //get posts of all friends
route.get('/:username/posts/nonFriends', api.posts.getNonFriendsPosts); //get posts of non friends
route.get('/:username/posts', api.posts.getPosts); //get posts for the user
route.get('/:username/posts/:certainUser', api.posts.getUserPosts); // get posts for a specified user


module.exports = route;