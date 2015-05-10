![](https://github.com/canalplus/telegraph/raw/master/icon.gif)

Telegraph is a small remote logger utility that allow you to send logs from your programs to a remote server with verbosity levels (info, warn, error, ...)

The utility is made with:
* a log utility to add to your programs (see the example),
* an express based log server that will receive the logs.

Logs will be saved in a timestamped text file (in <code>server/logs</code> directory) and displayed in the log server console.

Logs are sent with Ajax calls.

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

> telegraph@0.0.1 start ~/r7/telegraph
> node server/index.js

Listening on port 8081
[2015-05-09T21:34:39.741Z] [test] this is a test 2015 another argument
```

# Contributors

* [Jinroh](https://github.com/jinroh)
