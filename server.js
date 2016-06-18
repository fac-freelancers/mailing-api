const Hapi = require('hapi');
require('env2')('./config.env');
const api_key = process.env.MAILGUN;
const domain = process.env.ADDRESS;
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const port = process.env.PORT || 8000;

const server = new Hapi.Server();

server.connection({
  port,
  routes: {
    cors: true
  }
});

server.route([
  {
    method: 'get',
    path: '/mail/{info}',
    handler: function (request, reply) {
      const info = JSON.parse(request.params.info);

      console.log(info);
      console.log(api_key, domain);

      const data = {
        from: info.name + ' <' + info.email + '>',
        to: 'sam@foundersandcoders.com',
        subject: 'Message from: ' + info.name,
        text: 'Website: ' + info.website + '\n' +
          'Budget: ' + info.budget + '\n' +
          'Message: ' + info.message
      };

      mailgun.messages().send(data, function (error, body) {
        if(error) console.log(error);
        console.log(data.text);
        console.log(body);
        reply('Success');
      });
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
