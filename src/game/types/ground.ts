import Phaser, {Scene} from "phaser";

export default class Ground extends Phaser.GameObjects.GameObject
{
    body: Phaser.Physics.Arcade.StaticBody;
    sprite: Phaser.GameObjects.TileSprite;
    private fixedPosition: number = 0; //position that updates in FixedUpdate func and then interpolates in Update

    gameSmoothness: number = 0;
    gameSpeed: number = 14;

    constructor(scene: Scene, gameSmoothness: number)
    {
        super(scene, 'tileSprite');


        this.gameSmoothness = gameSmoothness;

        scene.events.on('FIXED_UPDATE', () =>
        {
            this.fixedUpdate()
        }, this)
        scene.events.on('UPDATE', () =>
        {
            this.update();
        }, this)

        scene.events.on('CHANGE_SPEED', (speed: number) =>
        {
            this.gameSpeed = speed;
        }, this)


        const {width, height} = scene.game.config;
        if (typeof width === "number" && typeof height === "number")
            this.sprite = scene.add.tileSprite(0, scene.game.canvas.height, 0, 0, 'ground').setOrigin(0, 1);

        this.body = scene.physics.add.staticBody(0, scene.game.canvas.height - this.sprite.displayHeight + 140, 1309, 50);
        //this.body.debugBodyColor = 54545454;
    }


    fixedUpdate()
    {
        this.fixedPosition += this.gameSpeed;
    }

    update()
    {
        super.update();
        this.sprite.tilePositionX = Phaser.Math.Linear(this.sprite.tilePositionX, this.fixedPosition, this.gameSmoothness)
    }
}