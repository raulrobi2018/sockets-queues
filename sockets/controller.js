const {TicketController} = require("../models/ticket-controller");

const ticketController = new TicketController();

const socketController = (socket) => {
    //All this events will be triggered when a new client will conect
    socket.emit("last-ticket", ticketController.last);
    socket.emit("current-state", ticketController.last4);
    socket.emit("pending-tickets", ticketController.tickets.length);

    //Sending message from backend to client
    socket.on("next-ticket", (payload, callback) => {
        const next = ticketController.nextTicket();
        callback(next);

        //Notify the new ticket
        socket.broadcast.emit(
            "pending-tickets",
            ticketController.tickets.length
        );
    });

    socket.on("attend-ticket", ({desk}, callback) => {
        if (!desk) {
            return callback({
                ok: false,
                msg: "The desk is required"
            });
        }

        const ticket = ticketController.attendTicket(desk);

        socket.broadcast.emit("current-state", ticketController.last4);

        //Here we are emitting to the client that is attending a new ticket
        socket.emit("pending-tickets", ticketController.tickets.length);
        //Here we are emitting to all the rest client
        socket.broadcast.emit(
            "pending-tickets",
            ticketController.tickets.length
        );

        if (!ticket) {
            callback({
                ok: false,
                msg: "There is no more tickets"
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });
};

module.exports = {
    socketController
};
