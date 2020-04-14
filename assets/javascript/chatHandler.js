// change this to ngrok
const socket = io.connect("http://localhost:8000");

let message = $("#message");
let username = $("#username");
let button = $("#send");
let output = $("#output");
let typing = $("#typing");

/** Event handlers */
function sendHandler() {
  socket.emit("chat-message", {
    message: message.val(),
    username: username.val(),
  });

  $(".typing").remove();
  message.val("");
}

function typingHandler() {
  socket.emit("typing", {
    username: username.val(),
  });
}

function receiveMessage(data) {
  let string = `<p><strong>${data.username}:</strong>${data.message}</p>`;
  output.append(string);
}

let count = 5;
function receiveTyping(data) {
  let string = `<p class="typing"><em>${data.username} is typing a message${".".repeat(count / 5)}</em></p>`;
  typing.html(string);
  count += 1;
  if (count == 20) {
    count = 5;
  }
}

$("#message").keypress(function (e) {
  if (e.which == 13) {
    if (message.val().trim() == "") {
      return;
    }
    sendHandler();
    return false; //<---- Add this line
  }
});

/** Connect event handlers */
message.keypress(typingHandler);
button.click(sendHandler);
socket.on("chat-message", receiveMessage);
socket.on("typing", receiveTyping);
