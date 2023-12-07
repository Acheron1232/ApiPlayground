var stompClient = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', function(response) {
            showMessage(JSON.parse(response.body));
        });
    });
    axios.get("/messages").then(response => {
      console.log(response);
        for (const i of response.data) {
            showMessage(i);
            console.log(i);
        }
    })
}

function sendMessage() {
    console.log("oleg");
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value;
    var sender = document.querySelector(".UI input[type='text']").value;
    const color = document.querySelector(".UI input[type='color']").value;
    console.log(color); 
    stompClient.send("/app/send_message", {}, JSON.stringify({ 'content': message, 'sender': sender, 'color': color }));
    // console.log(message, sender);
    messageInput.value = '';
}

function showMessage(message) {
    console.log(message);
    var messages = document.querySelector('.messages');
    var li = document.createElement('li');
    
    const author = document.createElement("span");
    author.textContent = message.sender + ": ";
    author.style.color = message.color || "red";

    const messg = document.createElement("span");
    messg.textContent = message.content;

    li.appendChild(author);
    li.appendChild(messg);
    messages.appendChild(li);
}

showMessage({content: "oleg", sender:"olegich", color:"red"});

connect();
