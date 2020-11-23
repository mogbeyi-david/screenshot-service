# Website Grabber
> API that takes screenshots of website and returns link to screenshots

## Install and Use

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/mogbeyi-david/website-grabber-service.git
```
This service uses [RabbitMQ](https://www.rabbitmq.com/) as a messaging queue technology and 
[Redis](https://redis.io/) as the caching technology.

To make the setup process super easy, we can just run these technologies as 
docker containers. Please see [Here](https://www.docker.com/get-started) to setup docker for 
your operating system.

Once you have docker setup, please run the following commands to run rabbitmq and redis 
as docker containers respectively.
```sh
docker run --detach --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
docker run --name some-redis -d redis
```

Copy the environment variables

```sh
cp .env.example .env
```

This service uploads images 

```sh
# cd website-grabber-service
$ npm install
$ npm start
```