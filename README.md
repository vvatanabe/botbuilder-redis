# botbuilder-redis [![Build Status](https://travis-ci.org/vvatanabe/botbuilder-redis.svg?branch=master)](https://travis-ci.org/vvatanabe/botbuilder-redis) [![Coverage Status](https://coveralls.io/repos/github/vvatanabe/botbuilder-redis/badge.svg?branch=master)](https://coveralls.io/github/vvatanabe/botbuilder-redis?branch=master) [![npm version](https://badge.fury.io/js/botbuilder-redis.svg)](https://badge.fury.io/js/botbuilder-redis)

Redis adapter for Microsoft BotBuilder.

## Usage

##### ./greet-bot.js:
``` javascript
'use strict'

const builder = require('botbuilder');
const RedisStorage = require('botbuilder-redis');
const redis = require('redis');
const client = redis.createClient();

const userStore = new RedisStorage(client, 'user');
const sessionStore = new RedisStorage(client, 'session');

const bot = new builder.TextBot({
  userStore: userStore,
  sessionStore: sessionStore  
})

bot.add('/', new builder.CommandDialog().matches('bye', session => {
	session.send('hello')
})

bot.listen()
```

## Install

``` sh
$ npm install --save botbuilder-redis redis
```

## License

MIT License

* http://www.opensource.org/licenses/mit-license.php
