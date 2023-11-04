import { Schema, type, MapSchema } from "@colyseus/schema";

export class PlayerSchema extends Schema {
    @type("float32")
    x = 0;

    @type("float32")
    y = 0;

    @type("boolean")
    isFlip = false;

    public constructor(x: number, y: number)
    {
        super();
        this.x = x;
        this.y = y;
    }
}

export class GameStateSchema extends Schema {
    @type({ map: PlayerSchema })
    players = new MapSchema<PlayerSchema>();
    @type("boolean")
    isStart = false;
    @type("uint32")
    mapId = 0;

    something = "This attribute won't be sent to the client-side";

    createPlayer(sessionId: string) {
        this.players.set(sessionId, new PlayerSchema(0, 0));
    }

    removePlayer(sessionId: string) {
        this.players.delete(sessionId);
    }

    changePosition(sessionId: string, newPos: PlayerSchema) {
        this.players.get(sessionId).x = newPos.x;
        this.players.get(sessionId).y = newPos.y;
        this.players.get(sessionId).isFlip = newPos.isFlip;
    }

    startGame()
    {
        this.isStart = true;
    }

    changePositionAll(newPos: PlayerSchema)
    {
        this.players.forEach((v, k) => {
            v.x = newPos.x;
            v.y = newPos.y;
        });
    }

    movePlayer (sessionId: string, movement: any) {
        if (movement.x) {
            this.players.get(sessionId).x += movement.x * 10;

        } else if (movement.y) {
            this.players.get(sessionId).y += movement.y * 10;
        }
    }
}