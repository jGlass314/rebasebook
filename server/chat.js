
const chat = require('socket.io')();
const connections = {};

const attach = function(server) {

  chat.attach(server);
  
  chat.on('connection', function (socket) {

    socket.on('login', (data) => {
      connections[data.username] = {
        username: data.username,
        socket: socket,
        connected: true
      };

      socket.emit('onlineusers', getOnlineUsers());

    });

    socket.on('message', (data) => {

      if (connections[data.to]) {
        let s = connections[data.to].socket;
        s.emit('message', data);
      } else {
        // create new notification
      }
    });

    socket.on('disconnect', (reason) => {
    });
  });
}

const getOnlineUsers = function() {
  return Object.keys(connections);
};

module.exports = {
  attach: attach,
  getOnlineUsers: getOnlineUsers
};


