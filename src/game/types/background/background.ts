import {Scene} from "phaser";
import BackgroundLayer from "./backgroundLayer";

export default class Background
{
    private sky: Phaser.GameObjects.Image;
    public backgroundLayers: BackgroundLayer[] = [];
    gameSpeed: number = 14;
    gameSmoothness: number = 0;


    constructor(scene: Scene, gameSmoothness: number)
    {
        this.gameSmoothness = gameSmoothness;

        scene.events.on('FIXED_UPDATE', () =>
        {
            this.fixedUpdate();
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
        {
            this.sky = scene.add.sprite(width / 2, height / 2 - 500, 'sky').setDepth(0).setDisplaySize(scene.game.canvas.width + 500, scene.game.canvas.height);
            for (let i = 0; i < 4; i++)
            {
                let sprite
                    = new BackgroundLayer(scene, i)
                this.backgroundLayers.push(sprite);
            }
        }

    }

    fixedUpdate()
    {
        this.backgroundLayers.forEach(function (value, index, array)
        {
            value.fixedPosition += (this.gameSpeed - 6) + index;
        }, this)
    }


    update()
    {
        this.backgroundLayers.forEach(function (value, index, array)
        {
            value.sprite.tilePositionX = Phaser.Math.Linear(value.sprite.tilePositionX, value.fixedPosition, this.gameSmoothness)
        }, this)
    }
}