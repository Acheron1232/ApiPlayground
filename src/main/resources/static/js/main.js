'use strict'

let stompClient = null;
let username = null;
function connect(event) {
    username=document.querySelector(".username").value;
    if(username) {
        document.querySelector(".username").setAttribute("hidden","hidden")
        document.querySelector(".userbutton").setAttribute("hidden","hidden")
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }
}


function onConnected() {

    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send("/app/send_username",
        {},
        JSON.stringify(username)
    )


}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) {
    if(stompClient) {
        stompClient.send("/app/send_message", {}, JSON.stringify({sender :username,content :document.querySelector(".message").value}));
    }
    // event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    console.log(message)




    // var messageElement = document.createElement('li');
    //
    // if(message.type === 'JOIN') {
    //     messageElement.classList.add('event-message');
    //     message.content = message.sender + ' joined!';
    // } else if (message.type === 'LEAVE') {
    //     messageElement.classList.add('event-message');
    //     message.content = message.sender + ' left!';
    // } else {
    //     messageElement.classList.add('chat-message');
    //
    //     var avatarElement = document.createElement('i');
    //     var avatarText = document.createTextNode(message.sender[0]);
    //     avatarElement.appendChild(avatarText);
    //     avatarElement.style['background-color'] = getAvatarColor(message.sender);
    //
    //     messageElement.appendChild(avatarElement);
    //
    //     var usernameElement = document.createElement('span');
    //     var usernameText = document.createTextNode(message.sender);
    //     usernameElement.appendChild(usernameText);
    //     messageElement.appendChild(usernameElement);
    // }

    // var textElement = document.createElement('p');
    // var messageText = document.createTextNode(message.content);
    // textElement.appendChild(messageText);
    //
    // messageElement.appendChild(textElement);
    //
    // messageArea.appendChild(messageElement);
    // messageArea.scrollTop = messageArea.scrollHeight;
}

// usernameForm.addEventListener('submit', connect, true)
// messageForm.addEventListener('submit', sendMessage, true)
// function asd(){
//     sendMessage()
// }