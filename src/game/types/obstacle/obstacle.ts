import {ObstacleImage} from "./obstacleImage";
import Phaser, {Scene} from "phaser";

export default class Obstacle extends Phaser.GameObjects.GameObject
{

    sprite: Phaser.GameObjects.Sprite;
    fixedPosition: number;//position that updates in FixedUpdate func and then interpolates in Update
    body: any;

    constructor(distance: number, obstacleImage: ObstacleImage, groundDisplayHeight: number, scene: Scene)
    {
        super(scene, 'body');
        const {width, height} = scene.game.config;


        if (typeof width == "number" && typeof height == "number")
        {
            var y: number;

            switch (obstacleImage.id)
            {
                case "cactus-4":
                case "cactus-5":
                    y = groundDisplayHeight - (490 / 2) + 60; //1100
                    break;
                default:
                    y = groundDisplayHeight - (494 / 2) + 30; //1070
                    break

            }

            this.sprite = scene.add.sprite(width + distance + (obstacleImage.width / 2), y, obstacleImage.id);
            this.fixedPosition = this.sprite.x;
            this.body = scene.physics.add.body(0, 0, obstacleImage.width - (obstacleImage.width * 0.45), obstacleImage.height - (obstacleImage.height * 0.2));
            this.body.setAllowGravity(false);
        }
        return this;
    }

    destroy(fromScene?: boolean)
    {
        super.destroy(fromScene);
        this.sprite.destroy(true);
    }

}