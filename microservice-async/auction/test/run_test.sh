#!/usr/bin/env node

docker run -d --name redistest -p 6379:6379 redis

deno test messageBrokerTests.ts --allow-net --allow-env

docker rm -f redistest 