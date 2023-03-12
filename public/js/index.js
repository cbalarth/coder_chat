let username;

Swal.fire({
    title: 'Indentificación',
    input: "text",
    text: 'Ingresa tu nombre de usuario.',
    inputValidator: (value) => {
        return !value && "¡Es obligatorio introducir un nombre de usuario!"
    },
    allowOutsideClick: false,
    confirmButtonText: 'Enviar'
}).then((result) => {
    username = result.value;
    console.log(username);
});

Swal.fire({
    title: 'Indentificación',
    input: "text",
    text: 'Ingresa tu nombre de usuario.',
    inputValidator: (value) => {
        return !value && "¡Es obligatorio introducir un nombre de usuario!"
    },
    allowOutsideClick: false,
    confirmButtonText: 'Enviar'
}).then((result) => {
    username = result.value;
    console.log(username);
    socket.emit("newUser", username); //Recibe los mensajes anteriores.
});


const socket = io();

// IDENTIFICA "INPUT MENSAJE" Y LO GUARDA EN "ARRAY MENSAJE"
const chatInput = document.getElementById("chatInput");
chatInput.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter"){
        const messageInput = chatInput.value;
        if (messageInput.trim().length > 0){
            socket.emit("message", {username, message: messageInput});
            chatInput.value = "";

        }
    }
}); 

// PROPORCIONA DATOS AL HTML EN BASE AL "OBJETO MENSAJES"
const chatMessages = document.getElementById("chatMessagesList");
socket.on("messages", (data) => {
    chatMessages.innerHTML = "";

    for (const el of data) {
        const li = document.createElement("li");
        li.innerText = `${el.username} : ${el.message}`;
        chatMessages.appendChild(li);
    }
});

// AVISA ENTRADA DE NUEVO USUARIO A TODOS LOS USUARIOS YA CONECTADOS
socket.on("newUser", (username) => {
    Swal.fire({
        title: `El usuario ${username} se ha unido al chat.`,
        toast: true,
        position: "top-end"
    });
});