import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT ;

const io = new Server(port,{
    cors: {
        origin: "http://localhost:3000",
        methods:['GET','POST'],
    }
})
io.on('connection', socket=>{
    socket.on('get-document',documentId=>{
        const data = "";
        socket.join(documentId);
        socket.emit('load-document',data);
        socket.on('send-changes',delta=>{
                socket.broadcast.to(documentId).emit('receive-changes',delta);
            })
    })
})
console.log(`Running on port ${port}`);


