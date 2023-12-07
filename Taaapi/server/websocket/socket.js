import {Server} from "socket.io";
export const io = new Server();

let positions = { };

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);

    socket.on('position', (user) => {
        if(!positions[socket.id]) {
            positions[socket.id] = { x: 0, y: 0 };
        }
        if(user.x > 0) {
            positions[socket.id].x = user.x;
        }
        if(user.y > 0) {
            positions[socket.id].y = user.y;
        }
        socket.broadcast.emit('position', { id: socket.id, x: positions[socket.id].x, y: positions[socket.id].y });
    });
});

setInterval(() => {
    io.emit('time', new Date().getTime());
},1000);