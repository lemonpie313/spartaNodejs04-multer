import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
//import socketRouter from "./socket.js";

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다
app.get("/messages", (req, res, next) => {
  try {
    res.sendFile(__dirname + "/socket.html");
  } catch (err) {
    next(err);
  }
});

app.get('/notify', (req, res) => {
  // 특정 라우터에 접속할 때마다 알림 발송
  io.emit('notification', { message: 'Router accessed!' });
  res.send('Notification sent');
});

// 클라이언트가 소켓 서버에 연결될 때
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // 클라이언트 연결 해제 시
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, function () {
  console.log("Socket IO server listening on port 3000");
});
