var stompClient = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        stompClient.subscribe('/topic/public', function(response) {
            showMessage(JSON.parse(response.body));
        });
    });
    axios.get("/messages").then(response => {
        for (const i of response.data) {
            showMessage(i);
        }
    })
}

function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value;
    var sender = document.querySelector(".UI input[type='text']").value;
    const color = document.querySelector(".UI input[type='color']").value;
    stompClient.send("/app/send_message", {}, JSON.stringify({ 'content': message, 'sender': sender, 'color': color }));
    // console.log(message, sender);
    messageInput.value = '';
}

function showMessage(message) {

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

showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })
showMessage({ 'content': "message", 'sender': "sender", 'color': "yellow" })

connect();
