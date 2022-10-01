//HTML References
const lblNewTicket = document.querySelector("#lblNewTicket");
const newTicketButton = document.querySelector("button");

//This is the client socket
const socket = io();

socket.on("connect", () => {
    newTicketButton.disabled = false;
});

socket.on("disconnect", () => {
    newTicketButton.disabled = true;
});

newTicketButton.addEventListener("click", () => {
    //Emit an event to the server
    socket.emit("next-ticket", null, (ticket) => {
        lblNewTicket.innerHTML = ticket;
    });
});

//Emit an event to the server
socket.on("last-ticket", (last) => {
    lblNewTicket.innerHTML = "Ticket " + last;
});
