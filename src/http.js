import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

app.use(express.static(new URL('../public', import.meta.url).pathname));

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

export { serverHttp, io };
