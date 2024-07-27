import {Game} from "phaser";

export class GameComponent {

    private static instance: GameComponent = new GameComponent();
    private game: Game = null;

    constructor() {
        if (GameComponent.instance) {

            throw new Error("GameComponent instance already exists");
        }
        GameComponent.instance = this;
    }

    public static getInstance() : GameComponent {
        GameComponent.instance = GameComponent.instance || new GameComponent();
        return GameComponent.instance;
    }

    getGame(config: any)
    {
        if(!this.game)
        {
            this.game = new Game(config);
            return this.game;
        }
        return this.game;
    }
}