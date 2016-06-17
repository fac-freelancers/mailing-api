const Hapi = require('hapi');
require('env2')('./config.env');

const port = process.env.PORT || 8000;

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({ port });

server.route([
  {
    method: 'post',
    path: '/mail',
    handler: function (request, reply) {
      reply(true);
    }
  },
  {
    method: 'get',
    path: '/',
    handler: function (request, reply) {
      reply('The factree api, set up to recieve post requests from the /mail endpoint');
    }
  }
]);

// Start the server
server.start(err => {
  if (err) throw err;
  console.log(`server running on: ${server.info.uri}`);
});
