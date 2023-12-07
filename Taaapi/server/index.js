import express from "express";
import {createServer} from "node:http";
import cors from "cors";
import {io} from "./websocket/socket.js";
import {studentsRouter} from "./routes/students.js";
import {coursesRouter} from "./routes/courses.js";

export const app = express();
export const server = createServer(app);

app.use(cors({
    origin: '*'
}));

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

server.listen(3000, () => {
    io.listen(server, {
        cors: {
            origin: 'http://localhost:5173',
        }
    });
    console.log('server running at http://localhost:3000');
});