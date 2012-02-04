/*
 * Prof of concept to test xmlrpc lib with OpenERP
 */
var xmlrpc = require('xmlrpc');

var ProxyRpc = function(dbname, host, user, passwd) {
    this.database = dbname;
    this.host = host;
    this.user = user;
    this.password = passwd;
    this.proxyOptions = {
      host: this.host,
      port: this.port,
      path:'/xmlrpc/common',    
    };
    this.client = xmlrpc.createClient(this.proxyOptions);
};

ProxyRpc.prototype = {
  login: function (arguments){
    this.client.methodCall('login', [this.database, this.user, this.password], function(error, user_id){
			console.log(user_id);
			return user_id;
		      });
  }  
};

module.exports = ProxyRpc;



