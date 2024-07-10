import Phaser from "phaser";

export abstract class BaseUIManager
{
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene)
    {
        this.initEvents(scene);
    }

    initEvents(scene: Phaser.Scene)
    {
        this.scene = scene;
        scene.events.on('SCENE_CONSTRUCTED', this.loadUI, this);
    }

    loadUI(scene: Phaser.Scene)
    {
    };

}