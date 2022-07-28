import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import viewsRouter from './routes/views-router.js'

const app = express();
const PORT = process.env.PORT || 8080;
const mensajes = [];


app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`)
});

const io = new Server(server);


io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado!'+socket.id);
    socket.on('mensaje', data => {
        mensajes.push(data);
    io.sockets.emit('mensajes',mensajes)
    }
    )
});