# Mailing Api

#### An api for the [facTree website](https://github.com/fac-freelancers/website) 

Technologies used:

* Node
* Hapi
* Mailgun

## Endpoint

```
{
  method: 'post',
  path: '/mail'
}
```

## Payload from the post request

```
{
  name,
  email,
  website,
  budget,
  message
}
```

