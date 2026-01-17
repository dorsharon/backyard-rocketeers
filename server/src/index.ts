import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import { GameRoom } from "./rooms/GameRoom";

const port = Number(process.env.PORT || 2567);
const app = express();

// Enable CORS for frontend
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Health check endpoint
app.get("/", (_req, res) => {
  res.json({
    message: "Backyard Rocketeers Server",
    status: "running",
    version: "1.0.0"
  });
});

const httpServer = createServer(app);
const gameServer = new Server({
  server: httpServer,
});

// Register the GameRoom
gameServer.define("game_room", GameRoom);

gameServer.listen(port);

console.log(`⚡ Backyard Rocketeers server is running on http://localhost:${port}`);
console.log(`🎮 WebSocket endpoint: ws://localhost:${port}`);
console.log(`📡 Game room available at: "game_room"`);
