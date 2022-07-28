
const socket = io({
    autoConnect:false
});

let userNick;

Swal.fire({
    title: "Logueate",
    input: "text",
    text: "Ingrese su nick",
    inputValidator: (value) => {
        return !value && "Necesito que se loguee para continuar"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then( (result) => {
    userNick = result.value;
    socket.connect();
}) 

let chat = document.getElementById('boton');
let mostrarTexto = document.getElementById('mostrarTexto');

chat.addEventListener('click', evt =>{
    let dato = document.getElementById('textChat');
    if (dato.value.trim().length > 0){
        socket.emit('mensaje', {
            user: userNick,
            mensaje: dato.value
        });
        dato.value = "";
    }
}); 


function render (data) {
    const html = data.map( (elem,index) => {
        return (`<div>
        ${elem.user} :  ${elem.mensaje}
        </div>`)}).join(" ");
        document.getElementById('mostrarTexto').innerHTML = html;
}


socket.on('mensajes', (data) => {
   render(data);
})