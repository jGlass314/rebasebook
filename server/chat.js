
const chat = require('socket.io')();
const connections = {};

const attach = function(server) {

  chat.attach(server);
  chat.on('connection', function (socket) {
    console.log('Incoming: ', socket.id);

    socket.on('login', (data) => {
      console.log(`Login from ${data.username} on ${socket.id}`);
      connections[data.username] = {
        username: data.username,
        socket: socket,
        connected: true
      };

      socket.emit('onlineusers', getOnlineUsers());

      for (let key in connections) {
        console.log(`[${connections[key].username}, ${connections[key].socket.id}`);
      }
    });

    socket.on('message', (data) => {
      console.log(`New Message from ${socket.id} to ${data.to}`);

      if (connections[data.to]) {
        let s = connections[data.to].socket;
        console.log(`Sending ${data.message} to ${data.to} on socket: ${s.id}`);
        s.emit('message', data);
      } else {
        // create new notification
      }
    });

    socket.on('disconnect', (reason) => {
      console.log(`Received disconnect from ${socket.id}, reason: ${reason}`);

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


