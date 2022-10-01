//HTML References
const lblDesk = document.querySelector("h1");
const attendButton = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPendings = document.querySelector("#lblPendings");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desk")) {
    window.location = "index.html";
    throw new Error("The desk is required");
}

const desk = searchParams.get("desk");
lblDesk.innerHTML = desk;

divAlert.style.display = "none";

//This is the client socket
const socket = io();

socket.on("connect", () => {
    attendButton.disabled = false;
});

socket.on("disconnect", () => {
    attendButton.disabled = true;
});

attendButton.addEventListener("click", () => {
    //Emit an event to the server
    socket.emit("attend-ticket", {desk}, ({ok, ticket, msg}) => {
        if (!ok) {
            lblTicket.innerText = "None";
            return (divAlert.style.display = "");
        }

        lblTicket.innerText = "Ticket " + ticket.number;
    });
});

socket.on("pending-tickets", (pendingTickets) => {
    if (pendingTickets === 0) {
        lblPendings.style.display = "none";
    } else {
        lblPendings.style.display = "";
        lblPendings.innerText = pendingTickets;
    }
});
