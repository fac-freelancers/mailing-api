const Hapi = require('hapi');
const Mailgun = require('mailgun').Mailgun;
require('env2')('./config.env');

const mg = new Mailgun(process.env.MAILGUN);
const emailAddress = process.env.ADDRESS;

const port = process.env.PORT || 8000;

const server = new Hapi.Server();

server.connection({ port });

server.route([
  {
    method: 'get',
    path: '/mail/{info}',
    handler: function (request, reply) {
      if(request.params.info.substring(0, 1) === 't') reply('working');
      const info = JSON.parse(request.params.info);
      mg.sendText(
        info.email,
        emailAddress,
        'message from: ' + info.name,
        'My budget is: ' + info.budget + '\n' +
        'My website is: ' + info.website + '\n' +
        'Message: ' + info.message,
        error => {
          if(error) reply(false);
          else reply(true);
        }
      );
    }
  },
  {
    method: 'get',
    path: '/',
    handler: function (request, reply) {
      reply('The factree api, set up to recieve post requests to the /mail endpoint');
    }
  }
]);

server.start(err => {
  if (err) throw err;
  console.log(`server running on: ${server.info.uri}`);
});
