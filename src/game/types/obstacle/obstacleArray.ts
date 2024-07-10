import Obstacle from "./obstacle";
import {Scene} from "phaser";
import {ObstacleImage} from "./obstacleImage";

export default class ObstacleArray
{
    array: Array<Obstacle> = [];
    gameSpeed: number = 0;
    gameSmoothness: number = 0;

    constructor(scene: Scene, gameSmoothness: number)
    {
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
    }

    clear()
    {
        this.array.forEach(function (value, index, array)
        {
            value.destroy(true);
        }, this)
        this.array = [];

    }

    add(distance: number, obstacleImage: ObstacleImage, groundDisplayHeight: number, scene: Scene)
    {
        let obstacle: Obstacle = new Obstacle(distance, obstacleImage, groundDisplayHeight, scene);
        this.array.push(obstacle);
        console.log('Obstacle added ' + this.array.indexOf(obstacle))

    }

    fixedUpdate()
    {
        this.array.forEach(function (value)
        {
            value.fixedPosition -= this.gameSpeed;
        }, this)
    }

    update()
    {
        this.array.forEach(function (value)
        {
            value.sprite.x = Phaser.Math.Linear(value.sprite.x, value.fixedPosition, this.gameSmoothness);
        }, this)
    }


    delete(obstacleIndex: number)
    {
        if (!this.array[obstacleIndex]) return;
        this.array[obstacleIndex].destroy(true);
        delete this.array[obstacleIndex];
    }

}