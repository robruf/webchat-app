var username = prompt("Enter your username:");

var socket = io.connect("/");

var messages = document.getElementById("messages");


var msg = document.getElementById("msg");
var btn = document.getElementById("send");
var broadcast = document.getElementById("broadcast");

function sendMessage() {
    
    socket.emit("chatMessage", {
        name: username,
        message: msg.value
    });
};

btn.addEventListener("click", function() {
    sendMessage();
    msg.value = "";
});

msg.addEventListener("keypress", function(event){
    socket.emit("typing", username);

    if(event.which==13) {
        sendMessage();
        msg.value = "";
    };
});

socket.on("chatMessage", function(data) {
    broadcast.innerHTML = "";
    messages.innerHTML += "<p><strong><i>" + data.name + "</strong></i>   " + data.message + "</p>";
    
});

socket.on("typing", function(data) {
    broadcast.innerHTML = "<span><em>" + data + " is typing a message...</em></span>";
});

setInterval(function() {
    messages.scrollTop = messages.scrollHeight;
}, 10);