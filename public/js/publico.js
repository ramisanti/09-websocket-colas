//referencias html

const lblTicket1     = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblTicket2     = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblTicket3     = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblTicket4     = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('estado-actual', (payload) => {
    const [ticket1,ticket2,ticket3,ticket4] = payload;
    if (ticket1){
        lblTicket1.innerText    =ticket1.numero;
        lblEscritorio1.innerText=ticket1.escritorio;
    }else{
        lblTicket1.innerText    ='NADIE';
        lblEscritorio1.innerText='NADIE';
    }
    
    if (ticket2){
        lblTicket2.innerText    =ticket2.numero;
        lblEscritorio2.innerText=ticket2.escritorio;
    }else{
        lblTicket2.innerText    ='NADIE';
        lblEscritorio2.innerText='NADIE';
    }
    
    if (ticket3){
        lblTicket3.innerText    =ticket3.numero;
        lblEscritorio3.innerText=ticket3.escritorio;
    }else{
        lblTicket3.innerText    ='NADIE';
        lblEscritorio3.innerText='NADIE';
    }
    
    if (ticket4){
        lblTicket4.innerText    =ticket4.numero;
        lblEscritorio4.innerText=ticket4.escritorio;
    }else{
        lblTicket4.innerText    ='NADIE';
        lblEscritorio4.innerText='NADIE';
    }
});
