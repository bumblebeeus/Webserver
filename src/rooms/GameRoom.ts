import { Room, Client } from "@colyseus/core";
import { GameStateSchema } from "./schema/GameStateSchema";

export class GameRoom extends Room<GameStateSchema> {
  maxClients = 5;

  onCreate (options: any) {
    this.setState(new GameStateSchema());

    this.onMessage("move", (client, message) => {
      this.state.changePosition(client.sessionId, message);
    });

    this.onMessage("start", (client, message) => {
      this.state.startGame();
    });

    this.onMessage("initPos", (client, message) => {
      this.state.changePositionAll(message);
    })
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.state.createPlayer(client.sessionId);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.removePlayer(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
