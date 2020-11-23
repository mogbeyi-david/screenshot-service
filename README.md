# Website Grabber
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

This service uploads images to S3 bucket, so we need to get AWS IAM credentials.
Please log in to your AWS console to generate credentials and create a s3 bucket.

Fill in the values of the following environment variables with the credentials you
generated, and the s3 bucket name

```sh
AWS_SECRET_ACCESS_KEY=
AWS_ACCESS_KEY_ID=
S3_BUCKET_NAME=
```

Then start the API
```sh
npm start
```

You can follow the link to the API docs displayed on the console for how to 
use the API