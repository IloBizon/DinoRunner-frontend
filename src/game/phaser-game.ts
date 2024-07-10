import Phaser from 'phaser'
import mainScene from './scenes/mainScene'
import preloadScene from './scenes/preloadScene'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

export default class PhaserGame
{
    config: Phaser.Types.Core.GameConfig =
        {
            type: Phaser.AUTO,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {x: 0, y: 5000},
                    debug: false,
                    customUpdate: true
                },
            },
            scale: {
                width: 1080,
                height: 1920,
                parent: 'game',
                mode: Phaser.Scale.ScaleModes.EXPAND,
            },

            parent: 'game',
            dom: {
                createContainer: false
            },

            scene: [preloadScene, mainScene],
            plugins: {
                scene: [
                    {
                        key: 'rexUI',
                        plugin: RexUIPlugin,
                        mapping: 'rexUI'
                    },

                ]
            },
        }

    startGame()
    {
        new Phaser.Game(this.config);
    }

    getGame()
    {

    }

}
