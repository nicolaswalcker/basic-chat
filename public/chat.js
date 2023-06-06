const chat_username = document.getElementById('chat_username');
const chat_room = document.getElementById('chat_room');
const message_input = document.getElementById('message_input');
const message_submit = document.getElementById('message_submit');
const messages_container = document.getElementById('messages');
const chat_logout = document.getElementById('chat_logout');

const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

socket.emit(
  'select_room',
  {
    username,
    room,
  },
  (messages) => {
    messages.forEach((message) => createMessage(message));
  }
);

chat_username.textContent = username;
chat_room.textContent = room;

chat_logout.addEventListener('click', (event) => {
  window.location.href = 'index.html';
});

message_input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value;

    const data = {
      room,
      message,
      username,
    };

    socket.emit('message', data);
    event.target.value = '';
  }
});

message_submit.addEventListener('click', (event) => {
  const message = message_input.value;

  const data = {
    room,
    message,
    username,
  };

  socket.emit('message', data);
  message_input.value = '';
});

socket.on('message', (data) => {
  createMessage(data);
});

const createMessage = (data) => {
  console.log(data);

  messages_container.innerHTML += `
  <li><span><strong>${data.username}</strong> - ${dayjs(data.createdAt).format(
    'DD/MM HH:mm'
  )}</span><span>${data.text}</span></li>
  `;
};