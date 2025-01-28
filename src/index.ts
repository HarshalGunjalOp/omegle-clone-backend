import { Socket } from "socket.io";
import http from "http";
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { UserManager } from "./managers/UserManger";

const app = express();
const server = http.createServer(app);

// Add cors middleware to Express
app.use(cors());

const FRONTEND_URL = "https://omegle-clone-frontend-umber.vercel.app";

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  allowEIO3: true, // Add this line
  transports: ['websocket', 'polling'] // Add this line
});

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  })
});

const PORT = process.env.PORT || 443;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
