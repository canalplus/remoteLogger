# remoteLogger

This is a remote logger utility to allow you to send logs from your program to a remote server.
Logs will be saved in a timestamped file (in <code>server/logs</code> directory)

## Install

```
% npm install
% cd server && npm install
```

## Launch the server

```
% npm start
```
or

```
% node server/index.js <port>
```

## Set the logger

Edit the file settings.json and set the key <code>LOGGER_OPTIONS.url</code> to match with the listening server.

# Use it

## Add a logger to your modules

```
var LOGGER = require('./index.js');

var LOG = LOGGER('test');

LOG('this is a test', 2015, process.cwd());
```

Will output on server console:

```
% npm start

> remoteLogger@0.0.1 start /Users/jtbonhomme/Developments/r7/remoteLogger
> node server/index.js

Listening on port 8081
[2015-05-09T21:34:39.741Z] [test] this is a test 2015 another argument
```
