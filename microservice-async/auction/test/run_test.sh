#!/usr/bin/env node

docker run -d --name redistest -p 6379:6379 redis

docker run -d --hostname rabbithost --name rabbittest -p 15672:15672 -p 5672:5672 rabbitmq:3-management

sleep 25s #yeah, this is a bit long, but that's what it takes

deno test amqp_tests.ts --allow-net --allow-env

docker rm -f redistest

docker rm -f rabbittest