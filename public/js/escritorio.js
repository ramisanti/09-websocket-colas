//referencias HTML
const nombreEscritorio = document.querySelector('#nombreEscritorio');
const atendiendo = document.querySelector('#atendiendo');
const encola = document.querySelector('#encola');
const lblPendientes = document.querySelector('#lblPendientes');
const lblNohaytickets = document.querySelector('#lblNohaytickets');
const btnAtender = document.querySelector('#btnAtender');

const seachParams = new URLSearchParams(window.location.search);
if (!seachParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error ('EL escritorio es obligatorio!');
}

const escritorio = seachParams.get('escritorio');
nombreEscritorio.innerText = escritorio;

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('tickets-pendientes',(tickets)=>{
    
    if (tickets>0){
        lblNohaytickets.style.display = 'none';
        lblPendientes.innerText = tickets;
    }else{
        lblNohaytickets.style.display = '';
        lblPendientes.innerText = 0;
    }
});

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', {escritorio}, ( {ok,ticket,msg} ) => {
        if (!ok){
            atendiendo.innerText = 'Nadie';
            return lblNohaytickets.style.display = '';
        }
        atendiendo.innerText = 'Ticket ' + ticket.numero;
    });

    socket.emit('tickets-pendientes',null,(tickets)=>{
    
        if (tickets>0){
            lblNohaytickets.style.display = 'none';
            lblPendientes.innerText = tickets;
        }else{
            lblNohaytickets.style.display = '';
            lblPendientes.innerText = 0;
        }
    });

});

