var express = require('express');
var socket = require('socket.io'); //require socket.io
var app = express();

var server =app.listen(4000, function(){
    //setup a server in port 4000
    console.log('listening to request on port 4000');
});

//Static files
app.use(express.static('public'));

//socket setup
var io = socket(server); //pass the server as socket parameter

//listening to 'connection' event', 
io.on('connection', function(socket){
    console.log('made socket connection', socket.id);//socket.id get the id from the connected client
    //listenig to the socket and  event 'chat'
    //affter 'chat' event occur receive the data 
    socket.on('chat', function(data){
        //after get a data from a client socket, emit 'chat' event to sending the data to another client
        io.sockets.emit('chat', data);
    });

    //listening to the typing 'event'
    socket.on('typing', function(data){
        //after typing event happend, emit 'typing' event again and broadcast the data to all the client
        socket.broadcast.emit('typing', data);
    });
});