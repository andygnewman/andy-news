var env = require('./env.json');

exports.configure = function() {
  var node_env = process.env.NODE_ENV || "test";
  return env[node_env];
};
