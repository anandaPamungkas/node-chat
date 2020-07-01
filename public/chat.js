//Make connection between client side and server side websocket
var socket = io.connect("http://localhost:4000");

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//emit events
btn.addEventListener('click', function(){
    //make event when user clicking the send button and send the data to the server side
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
});


message.addEventListener('keypress', function(){
    //make event when user typing and then send it to the server side
    socket.emit('typing', handle.value);
});

//listen for event
socket.on('chat', function(data){
    feedback.innerHTML = ""; //remove is typing after user clicking send button 
    //listen to event 'chat' form server side
    //when event chat happend output the message
    output.innerHTML += '<p><strong>'+ data.handle +' : </strong>' + data.message + '</p>'

});

socket.on('typing', function(data){
    //listen to 'typing'
    //after typing event occure recive data from server side
    feedback.innerHTML = '<p><em>' + data +' is typing a message...</em><p>'
});
