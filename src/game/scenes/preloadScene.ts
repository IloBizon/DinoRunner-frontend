import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene
{
    constructor()
    {
        super('PreloadScene');
    }

    preload()
    {
        this.load.spritesheet('dino', `static/testobj/dino-anim.png`,
            {
                frameWidth: 281,
                frameHeight: 314,
                startFrame: 0
            });
        this.load.image('ground', 'static/images/game/road2.png');
        this.load.image('sky', 'static/images/game/sky.png');

        this.load.image('background-0', 'static/images/game/background/background-0.png')
        this.load.image('background-1', 'static/images/game/background/background-1.png')
        this.load.image('background-2', 'static/images/game/background/background-2.png')
        this.load.image('background-3', 'static/images/game/background/background-3.png')


        this.load.image('transparentGround', 'static/testobj/transparentGround.png');

        this.load.image('startButton', 'static/testobj/button.png');
        this.load.image('startButton-pressed', 'static/testobj/button-pressed.png');
        this.load.image('fullscreen', 'static/testobj/fullscreen.png')
        this.load.image('coin', 'static/testobj/coin.png');


        this.load.image('cactus-0', 'static/images/game/cactuses/cactus-0.png');
        this.load.image('cactus-1', 'static/images/game/cactuses/cactus-1.png');
        this.load.image('cactus-2', 'static/images/game/cactuses/cactus-2.png');
        this.load.image('cactus-3', 'static/images/game/cactuses/cactus-3.png');
        this.load.image('cactus-4', 'static/images/game/cactuses/cactus-4.png');
        this.load.image('cactus-5', 'static/images/game/cactuses/cactus-5.png');
    }

    create()
    {
        //this.scene.start('devScene')
        this.scene.start('mainScene');
    }
}