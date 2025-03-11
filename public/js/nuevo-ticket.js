//referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('#btnCrear');

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on ('ultimo-ticket', ( ticket ) => {
    lblNuevoTicket.innerText = ticket;
});

btnCrear.addEventListener( 'click', () => {

    socket.emit('siguiente-ticket', null, ( ticket ) => {
        //console.log('desde el server',ticket);
        lblNuevoTicket.innerText = ticket;
    });
    

});

