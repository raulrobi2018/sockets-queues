const dbPath = require("path");
const fs = require("fs");

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketController {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        this.init();
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        };
    }

    init() {
        const {today, tickets, last, last4} = require("../db/data.json");
        // If is hoy, we need to reload the server
        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.last4 = last4;
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        const path = dbPath.join(__dirname, "../db/data.json");
        fs.writeFileSync(path, JSON.stringify(this.toJson));
    }

    nextTicket() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveDB();
        return "Ticket " + ticket.number;
    }

    attendTicket(desk) {
        //No more ticket
        if (this.tickets.length === 0) {
            return null;
        }

        //Deteles the ticket attended from the list of tickets
        const ticket = this.tickets.shift();

        ticket.desk = desk;

        //Add the ticket attended to the first place in the list of last 4
        this.last4.unshift(ticket);

        //Delete the last ticket from the list of last 4 if there are more than 4
        if (this.last4.length > 4) {
            this.last4.splice(-1, 1);
        }

        this.saveDB();

        return ticket;
    }
}

module.exports = {
    TicketController
};
