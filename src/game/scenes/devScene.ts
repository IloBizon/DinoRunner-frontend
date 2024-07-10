import {io} from "socket.io-client";

export default class DevScene extends Phaser.Scene
{
    player: Phaser.Physics.Arcade.Sprite;
    physicGround: any;
    socket: any;

    playerRectangle;

    playerServPosX: number = 0;
    playerServPosY: number = 960;

    constructor()
    {
        super('devScene');
    }

    create()
    {
        this.socket = io('ws://localhost:5000/socket', {
            transports: ['websocket']
        });

        const {width, height} = this.game.config;
        if (typeof width === "number" && typeof height === "number")
            this.add.tileSprite(width / 2, height / 2 + 470, 0, 0, 'ground').setOrigin(0.5, 0.5).setScrollFactor(0, 0);
        this.playerRectangle = this.add.rectangle(300, 960, 401, 448, 0xff42230);
        this.physicGround = this.physics.add.staticImage(400, 1550, 'transparentGround').refreshBody();

        this.player = this.physics.add.sprite(300, 960, 'dino').setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.physicGround);


        this.input.on('pointerdown', this.jump, this)

        this.socket.emit('playerJoin');

        this.socket.on('gameUpdate', (playerPos, ts) =>
        {
            this.playerServPosY = playerPos;
            this.playerRectangle.y = Phaser.Math.Linear(this.playerRectangle.y, this.playerServPosY, 0.5);
            console.log('Server: ' + ts + ' Client: ' + Date.now());
        }, this)
    }


    update(time: number, delta: number)
    {

        super.update(time, delta);
        //this.playerRectangle.y = Phaser.Math.Linear(this.playerRectangle.y, this.playerServPosY, 0.2);
    }


    jump()
    {
        this.player.body.velocity.set(0, -2300);
        this.socket.emit('playerJump', Date.now());
    }
}