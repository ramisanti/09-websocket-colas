const TicketControl = require('../models/ticket-control');
const ticketcontrol = new TicketControl;

const socketController = (socket) => {
//se envía cuando el cliente se conecta
    socket.emit ('estado-actual',ticketcontrol.ultimos4);
    socket.emit ('ultimo-ticket',ticketcontrol.ultimoTicket());
    socket.emit('tickets-pendientes', ticketcontrol.tickets.length);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketcontrol.siguiente();
        callback(siguiente);
        
        //TODO notificar el nuevo ticket pendiente de asignar
        socket.broadcast.emit('tickets-pendientes', ticketcontrol.tickets.length);
        socket.broadcast.emit ('estado-actual',ticketcontrol.ultimos4);
    });

    socket.on('tickets-pendientes',(payback,callback)=>{
        const pendientes = ticketcontrol.tickets.length;
        callback(pendientes);
    });

    socket.on('atender-ticket', ({escritorio}, callback)=>{
        if (!escritorio){
            return callback({
                ok:false,
                msg:'El escritorio es obligatorio'
            });
        }

        const ticket = ticketcontrol.atenderTicket(escritorio);
        //TODO Notificar cambio de los ultimos4
        socket.broadcast.emit ('estado-actual',ticketcontrol.ultimos4);
        socket.broadcast.emit('tickets-pendientes', ticketcontrol.tickets.length);

        if (!ticket || ticket===0){
            callback({
                ok:false,
                msg:'Ya no hay tickets pendientes!'
            });
        }else{
            callback({
                ok:true,
                ticket
            });
            
        }

    });
        
}

module.exports = {
    socketController
}

