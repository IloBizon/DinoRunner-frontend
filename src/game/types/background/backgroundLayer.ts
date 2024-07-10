import Phaser, {Scene} from "phaser";

export default class BackgroundLayer extends Phaser.GameObjects.GameObject
{

    sprite: Phaser.GameObjects.TileSprite;
    fixedPosition: number = 0; //position that updates in FixedUpdate func and then interpolates in Update


    constructor(scene: Scene, spriteID: number)
    {
        const {width, height} = scene.game.config;
        super(scene, 'tileSprite');

        if (typeof width === "number" && typeof height === "number")
            this.sprite = scene.add.tileSprite(0, scene.game.canvas.height - 650, 0, 0, `background-${spriteID}`).setOrigin(0, 1);
    }
}