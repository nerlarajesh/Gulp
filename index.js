var unirest = require('unirest');
var hapi = require('hapi');
var server = new hapi.Server();
var vision = require('vision');
var inert = require('inert');
var handlebar = require('handlebars');
var mongoose = require('mongoose');
var Product = require('./models/productModel');
var User = require('./models/userModel');
mongoose.connect("mongodb://localhost:27017/productsDB");
//START:Defining Connection Properties
server.connection({
    port: 8080,
    host: 'localhost'
});
//END:Defining Connection Properties
//START:Third Party Modules Registraton
server.register([
    { register: vision },
    { register: inert }
]);
//END:Third Party Modules Registraton
//START:View Creation
server.views({
    engines: {
        hbs: handlebar
    },
    path: __dirname + '/views'
});
//END:View Creation
//START:Rendering Code for CSS, JS, Images Files
server.route({
    method: 'GET',
    path: '/css/{file*}',
    handler: {
        directory: {
            path: 'css',
            listing: true
        }
    }
});
server.route({
    method: 'GET',
    path: '/js/{file*}',
    handler: {
        directory: {
            path: 'js',
            listing: true
        }
    }
});
server.route({
    method: 'GET',
    path: '/img/{file*}',
    handler: {
        directory: {
            path: 'images',
            listing: true
        }
    }
});
//START:Rendering Code for CSS, JS, Images Files
//START:Routing code
server.route({
    method: 'GET',
    path: '/login',
    handler: function(request, reply) {
        reply.view('login');
    }
});
server.route({
    method: 'POST',
    path: '/home',
    handler: function(request, reply) {
         User.findByIdAndRemove(request.payload.email).exec(function(err, res) {
            new User({
                email: request.payload.email,
            	pwd: request.payload.pwd,
            	name: request.payload.name
            }).save(function(err,res){
                if(err) reply.json(err);
            	else reply.view('home', { message: 'Welcome to the Landing Page ' + request.payload.name});
                
            });
            });
    }
});
server.route({
    method: 'POST',
    path: '/pDetailsForm',
    handler: function(request, reply) {
        new Product({
        	pid: request.payload.pid,
            name: request.payload.pname,
            path: request.payload.pimg,
            desc: request.payload.pdesc
        }).save(function(err,result){
        	if(err) res.json(err);
        	else reply.view('home', { message: 'Data Inserted Successfully'});
        });
       

    }
});
server.route({
    method: 'GET',
    path: '/list',
    handler: function(request, reply) {
        var JSONdata = [];
        mongoose.model('products').find(function(err,products){
        	products.forEach(function(doc, err) {
                JSONdata.push(doc);
            });
        });
        reply.view('listing',{data:JSONdata})
        /*mongo.connect(url, function(err, db) {
            var cursor = db.collection('product').find();
            cursor.forEach(function(doc, err) {
                JSONdata.push(doc);
            }, function() {
                db.close();
            });
        });*/
        
    }
});
server.route({
    method: 'GET',
    path: '/pdetails',
    handler: function(request, reply) {
        reply.view('productdetails');
    }
});
server.route({
    method: 'GET',
    path: '/detail',
    handler: function(request, reply) {
        console.log(request.query.pid);
        var resultArray = [];
        mongoose.model('products').find({pid:request.query.pid},function(err,products){
        	console.log(products);
        	products.forEach(function(doc, err) {
                resultArray.push(doc);
            });
        });
        reply.view('detail', { productDetail: resultArray });
    }
});

server.route({
    method: 'GET',
    path: '/getdata',
    handler: function(request, reply) {
        var resultArray = [];
        mongoose.model('users').find(function(err,users){
        	console.log(users);
        	users.forEach(function(doc, err) {
                resultArray.push(doc);
            });
        });
        console.log(resultArray);
        reply.view('getusers', { data: resultArray });
    }
});
server.route({
    method: 'GET',
    path: '/remove',
    handler: function(request, reply) {
        mongo.connect(url, function(err, db) {
            if (err) {
                console.log(error);
            } else {
                db.collection('user').deleteMany({ email: 'mahiraj.royal36@gmail.com' }, function(err, res) {
                    reply.view('home', { message: 'Removed the data success Fully' });
                });


            }
        });
    }
});
//END:Routing code
//START:Start the Server
server.start(function() {
    console.log('server running at: ' + server.info.uri);
});
//END:Start the Server