/*
 * Prof of concept library in Node.js & OpenERP
 */
var xmlrpc = require('xmlrpc');

//var openobject = exports;

var Connector = function(dbname, hostname, port, user, passwd) {
    this.database = dbname;
    this.host = hostname;
    this.port = port;
    this.user = user;
    this.password = passwd;
    this.url = 'http://'+hostname+':'+port+'/xmlrpc';
    this.common = {
        host: this.host,
        port: this.port,
        path:'/xmlrpc/common'
    };
    this.object = {
        host: this.host,
        port: this.port,
    },
    this.rpc_common = xmlrpc.createClient(this.common);
    console.log("[X] Proxy instance initializating...");
    console.log("[X] Database in use... "+this.database);
    console.log("[X] OpenERP Hostname Server... "+this.host);
    console.log("[X] Creating RPC Client instance...");
};

Connector.prototype = {
    send: function(service, method, args){
        url_list = [this.url, "/", service];
        url = url_list.join("");
        this.object['url'] = url;
        this.rpc_object = xmlrpc.createClient(this.object);
        
    },
};

var Connection = function(connector, database){
    this.connector = connector;
    this.database = database;
    this.user = this.connector.user;
};

Connection.prototype = {
  login: function (username, password){
    console.log('[X] Login database: '+this.database);
    this.connector.rpc_common.methodCall('login', [this.database, this.user, this.connector.password], function(error, user_id){
        this.user_id = user_id;
        console.log("[X] User logged..."+user_id);
		return user_id;
	});
  }
};

var Object = function(connection, model, context){
    this.connection = connection;
    this.model = model;
    this.context = context;
    console.log('[X] Object initializated...');
};

Object.prototype = {
    send: function(method, params){
        console.log('[X] method: '+method);
        console.logg('[X] params: '+args);
        result = this.connection.connector.rpc_object(method, [this.connector.database, this.connector.user, this.connector.password]);
    },
    search_count: function(domain, context){
        if (context == null){
            context = {}
        }
        return 
        console.log('search count called');
    },
    exists: function(oid, context){
        value = this.search_count(('id','=',oid), context);
        return value>0;
    },
};

OpenObject = function(database, host, port, user, password){
    this.connector = new Connector(database, host, port, user, password);
    this.connection = new Connection(this.connector, database);
    console.log("[X] Initializating OpenERP object...");
};

OpenObject.prototype = {
    login: function(username, password){
        console.log("[X] Intent login user: "+username);
        this.connection.login(username, password);
    },
};

if (typeof module !== 'undefined'){
    module.exports.OpenObject;
}
//exports.OpenObject = OpenObject;

//module.exports.Connection = Connection;



