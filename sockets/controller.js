const socketController = (socket) => {
    console.log("Client connected", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });

    //Sending message from backend to client
    socket.on("send-message", (payload, callback) => {
        const id = 123456;
        callback({id, date: new Date().getTime()});

        //Emit the response to all the clients connected except to this client
        socket.broadcast.emit("response-server", JSON.stringify(payload));
    });
};

module.exports = {
    socketController
};
