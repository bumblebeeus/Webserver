import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { createServer } from "http";
import express from "express";
import { GameRoom } from "./rooms/GameRoom";
const port = Number(process.env.PORT) || 9999;

const app = express();
app.use(express.json());

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
    pingInterval: 0, //  Debug only
  }) 
});

gameServer.define("game", GameRoom);
gameServer.listen(port);