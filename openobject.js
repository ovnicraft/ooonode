/*
 * Prof of concept to test xmlrpc lib with OpenERP
 */
var xmlrpc = require('xmlrpc');

var openobject = exports

ProxyRpc = function(dbname, host, port, user, passwd) {
  this.database = dbname;
  this.host = host;
  this.port = port;
  this.user = user;
  this.password = passwd;
  this.proxyOptions = {
    host: this.host,
    port: this.port,
    path:'/xmlrpc/common'
  };
  this.client = xmlrpc.createClient(this.proxyOptions);
  console.log('Proxy instance creating...');
  console.log('Creating rpc client...');
};

ProxyRpc.prototype = {
  login: function (arguments){
    console.log('Login database: '+this.database);
    this.client.methodCall('login', [this.database, this.user, this.password], function(error, user_id){
			console.log(user_id);
			return user_id;
		      });
  }  
};

module.exports = ProxyRpc;



