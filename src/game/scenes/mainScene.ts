import Phaser from "phaser";
import Player from "../types/player";
import {io, Socket} from "socket.io-client";
import ObstacleArray from "../types/obstacle/obstacleArray";
import {ObstacleImage} from "../types/obstacle/obstacleImage";
import Background from "../types/background/background";
import Ground from "../types/ground";
import {AuthManager} from "../classes/authManager";
import {CoinManager} from "../classes/coinManager";

export default class MainScene extends Phaser.Scene
{
    private coinManager: CoinManager;

    private ground: Ground
    private background: Background;
    private isGameStarted: boolean = false;
    player: Player;
    private startTrigger: Phaser.Physics.Arcade.Sprite;
    private obstacles: ObstacleArray;

    public gameSmoothness: number = 0.3; //All objects position interpolation percentage (0-1)


    private currentGameSpeed: number = 14;


    elapsedTime: number = 0.0;
    fixedTimeStep: number = 1000 / 64;

    private socket: Socket;

    private readyToStart: boolean = true;

    //DEBUG
    private isDebugOn: boolean = true;
    serverPlayerBody1: Phaser.Physics.Arcade.Body;
    serverPlayerBody2: Phaser.Physics.Arcade.Body;

    constructor()
    {
        super('mainScene');
    }

    GetGameStarted(): boolean
    {
        return this.isGameStarted
    };


    create()
    {
        this.socket = io('wss://89.248.207.120:5000/socket', {
            auth: {
                token: AuthManager.getInstance().getAuthToken()
            }
        });
        this.initSocket();

        this.socket.emit('playerJoin');

        if (this.isDebugOn)
        {
            this.turnOnDebug()
        }

        this.coinManager = CoinManager.getInstance();

        this.player = new Player(this);

        this.obstacles = new ObstacleArray(this, this.gameSmoothness);

        this.background = new Background(this, this.gameSmoothness);
        this.ground = new Ground(this, this.gameSmoothness);

        this.scale.refresh();

        this.startTrigger = this.physics.add.sprite(200, this.game.canvas.height - 1300, '')
            .setImmovable(true);
        this.startTrigger.alpha = 0;
        this.startTrigger.setGravity(0, -this.game.config.physics.arcade.gravity.y);


        this.initAnimations();
        this.initColliders();

        //this.add.tileSprite(this.game.canvas.width, this.game.canvas.height, this.game.canvas.width, 0, 'ground').setOrigin(1, 1);

        this.game.events.emit('SCENE_CONSTRUCTED');

    }

    turnOnDebug()
    {
        this.serverPlayerBody1 = this.physics.add.body(0, 0, 150, 100);
        this.serverPlayerBody1.setGravityY(-5000)

        this.serverPlayerBody2 = this.physics.add.body(0, 0, 100, 130);
        this.serverPlayerBody2.setGravityY(-5000)

        this.socket.on('updateDebug', (player) =>
        {
            this.serverPlayerBody1.position.set(player.playerBodyPos1.x, player.playerBodyPos1.y)
            this.serverPlayerBody2.position.set(player.playerBodyPos2.x, player.playerBodyPos2.y);
            //this.serverObstacle.setPosition(player.obstaclePos.x, player.obstaclePos.y);
        })
    }

    handleInputs()
    {
        if (!this.isGameStarted) return;
        this.input.on('pointerdown', this.jump, this)
    }

    initColliders()
    {
        // @ts-ignore
        this.physics.add.collider([this.player.body1, this.player.body2], this.obstacles.array, () =>
        {
            console.log('CLIENT LOOSE')
        }, null, this);

        // @ts-ignore
        this.physics.add.collider(this.player, this.ground.body);
    }

    initSocket()
    {
        this.socket.on('placeObstacle', (distance, obstacleImage) =>
        {
            console.log('Server place')
            this.placeObstacle(distance, obstacleImage);
        })

        this.socket.on('destroyObstacle', (obstacleIndex) =>
        {
            this.destroyObstacle(obstacleIndex);
        })
        this.socket.on('moveObstacle', (obstacleIndex, Pos) =>
        {
            this.obstacles.array[obstacleIndex].body.position.set(Pos.x, Pos.y);
        })

        this.socket.on('looseGame', (playerPosY) =>
        {
            this.looseGame();
        })

        this.socket.on('changeGameSpeed', (speed: number) =>
        {
            this.changeGameSpeed(speed);
            this.events.emit('CHANGE_SPEED', speed);
        })


        this.socket.on('serverJump', () =>
        {
            this.player.body.velocity.set(0, -2200);
        })

        this.socket.on('addCoin', (coinMultiplier: number) =>
        {
            this.coinManager.addCoin(this, coinMultiplier);
        })
    }

    looseGame()
    {
        this.physics.pause();
        this.isGameStarted = false;
        this.anims.pauseAll();
        console.log('Loose');
        this.input.off('pointerdown', this.jump, this);
        this.player.sprite.setTexture('dino', 3);
        this.player.body.position.set(this.player.body.x, this.player.sprite.y - (this.player.sprite.height / 2));
        this.game.events.emit('GAME_LOOSED');

    }

    clearScene()
    {
        this.player.body.velocity.y = 0;
        this.physics.resume();

        this.obstacles.clear();
        if (this.player.body.touching.down)
        {
            this.readyToStart = true;
            this.initGameStart()
        } else
        {
            this.time.delayedCall(500, () =>
            {
                this.readyToStart = true;
                this.initGameStart()
            }, [], this);
        }

        this.time.delayedCall(500, () =>
        {
            this.startTrigger.enableBody(true, 200, this.game.canvas.height - 1300, true, true);
        }, [], this);


    }


    jump()
    {
        if (this.player.body.touching.down)
        {
            if (this.isGameStarted)
            {

                this.socket.emit('playerJump');
            }
            //
        }
    }


    initAnimations()
    {
        this.anims.create({
            key: 'dino-run',
            frames: this.anims.generateFrameNumbers('dino', {start: 1, end: 2}),
            frameRate: 5,
            repeat: -1
        })
    }


    initGameStart()
    {
        if (this.isGameStarted) return;

        if (!this.readyToStart)
        {
            this.clearScene();
            return;
        } else
        {
            this.readyToStart = false;
        }
        this.game.events.emit('GAME_START_INITIALIZED')
        this.player.body.velocity.set(0, -2200);

        this.physics.add.overlap(this.player, this.startTrigger, () =>
        {
            if (this.startTrigger.y == this.game.canvas.height - 1300)
            {
                this.startTrigger.body.reset(200, this.game.canvas.height - 900);
                return;
            }
            this.startTrigger.disableBody(true, true);
            const startEvent: Phaser.Time.TimerEvent = this.time.addEvent({
                delay: 1000,
                loop: false,
                callbackScope: this,
                callback: () =>
                {
                    if (this.anims.paused)
                        this.anims.resumeAll();

                    this.isGameStarted = true;
                    this.socket.emit('startGame');
                    this.handleInputs();
                    this.player.serverPositionY = this.player.body.position.y;
                    this.events.emit('GAME_STARTED');
                }

            })

        }, null, this)
    }

    placeObstacle(distance: number, obstacleImage: ObstacleImage)
    {
        this.obstacles.add(distance, obstacleImage, this.ground.body.y, this);
    }

    changeGameSpeed(speed: number)
    {
        this.currentGameSpeed = speed;
    }

    destroyObstacle(obstacleIndex)
    {
        if (this.isGameStarted)
            this.obstacles.delete(obstacleIndex);
    }

    fixedUpdate(time, fixedTimeStep)
    {
        this.player.update(this.isGameStarted, this.obstacles.array.length > 0);
        this.physics.world.update(time, fixedTimeStep);
        if (!this.isGameStarted) return;
        if (!this.player.body.touching.down)
        {
            this.player.sprite.anims.stop()
            this.player.sprite.setTexture('dino');
        } else
        {
            this.player.sprite.play('dino-run', true);
        }

        this.events.emit('FIXED_UPDATE')
    }


    update(time, delta)
    {
        super.update(time, delta);
        this.elapsedTime += delta;
        while (this.elapsedTime >= this.fixedTimeStep)
        {
            this.elapsedTime -= this.fixedTimeStep;
            this.fixedUpdate(time, this.fixedTimeStep);
        }
        if (this.isGameStarted)
            this.events.emit('UPDATE')
    }

}

