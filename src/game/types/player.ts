import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.GameObject
{
    body: Phaser.Physics.Arcade.Body;

    body1: Phaser.Physics.Arcade.Body;
    body2: Phaser.Physics.Arcade.Body;

    sprite: Phaser.GameObjects.Sprite;

    serverPositionY: number;

    constructor(scene: Phaser.Scene)
    {
        super(scene, 'gameobject');
        this.sprite = scene.add.sprite(200, 865, 'dino');

        this.sprite.setDepth(10);

        this.body = scene.physics.add.body(200, 865, 281, 314)

        this.body.setCollideWorldBounds(true)


        this.body1 = scene.physics.add.body(200, 1000, 150, 100);
        this.body1.debugBodyColor = 5;
        this.body1.setGravityY(-5000);

        this.body2 = scene.physics.add.body(200, 1000, 100, 130)
        this.body2.debugBodyColor = 9435346;
        this.body2.setGravityY(-5000);

    }

    update(isGameStarted: boolean, isObstaclesInGame: boolean)
    {
        this.sprite.setPosition(this.body.position.x + this.body.halfWidth, this.body.position.y + this.body.halfHeight)
        this.updateBodies()

    }

    updateBodies()
    {
        this.body1.position.set(this.body.position.x + this.body.halfWidth - 30, this.body.position.y + 50);
        this.body2.position.set(this.body.position.x + this.body.halfWidth - 70, this.body.position.y + 150);
    }

}