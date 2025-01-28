import { Socket } from "socket.io";
import http from "http";

import express from 'express';
import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManger";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://omegle-clone-frontend-umber.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
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

// Keep the listen call for local development
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running`);
});
