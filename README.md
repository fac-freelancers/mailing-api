# Mailing Api

#### An api for the [facTree website](https://github.com/fac-freelancers/website) 

#### Quick Start

Run:

`git clone https://github.com/fac-freelancers/mailing-api.git && cd mailing-api && npm i && npm start`

You will need to set up a `config.env` file in the root with these environment variables

```
MAILGUN=<your mailgun api key>
ADDRESS=<your domain name registered with mailgun>
```

#### Deployment

The site is hosted on heroku at: http://factree-api.herokuapp.com/

If further changes need to be made simply push them to the `heroku` branch and they will be deployed

## Endpoint

```
{
  method: 'get',
  path: '/mail'
}
```

## Payload for the post request

```
{
  name,
  email,
  website,
  budget,
  message
}
```

