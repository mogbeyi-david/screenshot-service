# Screenshot Service
> API that takes screenshots of website and returns link to screenshots

## Install and Use

Start by cloning this repository

```sh
$ git clone https://github.com/mogbeyi-david/screenshot-service.git
```

Change into the repository folder
```sh
$ cd screenshot-service
```

Copy the environment variables

```sh
$ cp .env.example .env
```

Install dependencies
```sh
$ npm install
```


This service uploads images to S3 bucket, so we need to get AWS IAM credentials.
Please log in to your [AWS console](https://console.aws.amazon.com/) to generate credentials 
and create a publicly accessible s3 bucket.


Fill in the values of the following environment variables with the credentials you
generated, and the s3 bucket name

```sh
AWS_SECRET_ACCESS_KEY=
AWS_ACCESS_KEY_ID=
S3_BUCKET_NAME=
```

This service uses [RabbitMQ](https://www.rabbitmq.com/) as a messaging queue technology and 
[Redis](https://redis.io/) as the caching technology and [MongoDB](https://www.mongodb.com/) as the database management system

To make the setup process super easy, we can just run these technologies as 
docker containers. Please see [Here](https://www.docker.com/get-started) to set up docker for 
your operating system.

Once you have docker setup, please run the following commands to run rabbitmq, redis 
and mongodb as docker containers respectively.
```sh
docker run --detach --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
docker run --name some-redis -d redis
docker run --name some-mongo -d mongo:4.2.11
```

When the containers have started, please run the following command to start the redis server

```sh
redis-server
```

Then start the API
```sh
npm start
```

You can follow the link to the API docs displayed on the console for how to 
use the API.

Please visit [here](https://www.notion.so/System-Architecture-and-Suggestion-for-Improvement-374c51dd3aff4307a397435b246211ad) for explanation of the system architecture, suggestions for improvements and other ways the system can also be successfully implemented

### npm test

This command:

- sets the **environment variable** `NODE_ENV` to `test`
- creates the `test database`
- runs `jest --coverage --verbose` for testing with [Jest](https://github.com/facebook/jest) and the coverage
- drops the `test database` after the test

![Image showing test coverage](https://ibb.co/RpxFb5P)