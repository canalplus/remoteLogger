(function(){
  'use strict';
  var request = require('request');
  var path    = require('path');

  var global = require(path.normalize(path.dirname(process.argv[1])+'/settings.json'));

  var LEVELS = ['debug', 'info', 'warning', 'error', 'fatal'];

  var _slice = Array.prototype.slice;

  var COLORS = {
    debug:   'grey',
    info:    'dodgerblue',
    warning: 'orange',
    error:   'red',
    fatal:   'maroon'
  };

  function filter(args, namespace) {
    var f = global.LOGGER_FILTERS;
    if (f && f[namespace]) { return; }
    return _slice.call(args);
  }

  function REMOTE_LOGGER(options) {
    var flush    = [],
    size     = options.batchSize || 50,
    interval = options.batchInterval || 5000,
    url      = options.url;

    function send() {
      var logs = flush.splice(0, size);
      function fail() {
        flush.unshift.apply(flush, logs);
        setTimeout(send, interval);
      }
      var options = {
        uri: url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json: true,
        body: logs
      };
  
      request(options, function(err, msg, body){
        if(err) {
          fail();
        }
        else {
          if(msg.status >= 300) { return fail(); }
          if (flush.length) { setTimeout(send, interval); }
        }
      });
    }
  
    return function(args, namespace, level) {
      if (!url) { return; }
      var log = {
        namespace: namespace,
        level: level,
        date: new Date(),
        args: args
      };
      if (flush.push(log) === 1) {
        setTimeout(send, interval);
      }
    };
  }

    var list = {
    //    'console': CONSOLE_LOGGER,
    //    'html':    HTML_LOGGER,
    'remote':  REMOTE_LOGGER
    };

    var names = (global.LOGGER_NAME || '').split(',');
    var loggers = names.map(function(name) {
      var logger = list[name];
      return logger && logger(global.LOGGER_OPTIONS || {});
    });

    function LOGGER(namespace) {
      var logger = function() {
        if (!loggers.length) { return; }
        var args = filter(arguments, namespace);
        var levl = (this && this.LOG_LEVEL) || 'info';
        args && loggers.forEach(function(l) {
          l(args, namespace, levl);
        });
      };
      return logger;
    }

    module.exports = LOGGER;
})();