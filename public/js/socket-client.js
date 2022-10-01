//HTML References
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMessage = document.querySelector("#txtMessage");
const btnSend = document.querySelector("#btnSend");

//This is the client socket
const socket = io();

socket.on("connect", () => {
    lblOffline.style.display = "none";
    lblOnline.style.display = "";
});

socket.on("disconnect", () => {
    lblOffline.style.display = "";
    lblOnline.style.display = "none";
});

socket.on("response-server", (payload) => {
    console.log(
        "Hi! I'm the server. Message received! Your message is -> '" + payload
    );
});

btnSend.addEventListener("click", () => {
    const message = txtMessage.value;
    const payload = {
        message,
        date: new Date(),
        id: "65sd4f65asdf4as5d4f"
    };

    //Emit an event to the server
    socket.emit("send-message", payload, (id) => {
        console.log("Id recibido en el server", id);
    });
});
