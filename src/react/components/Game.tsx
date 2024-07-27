import React, {useEffect, useRef, useState} from "react";
import Phaser from "phaser";
import preloadScene from "../../game/scenes/preloadScene";
import mainScene from "../../game/scenes/mainScene";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import {useGame} from "../hooks/useGame";
import {setGlobalState, useGlobalState} from "../globalStates";
export default function Game()
{

    let config = {
        game:
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
                    mode: Phaser.Scale.ScaleModes.EXPAND,
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
    }

    let gameRef = useRef<HTMLDivElement>(null)
    const [isPhaserGameLoaded] = useGlobalState('isPhaserGameLoaded')
    const game = useGame(config.game, gameRef)
    useEffect(() =>
    {
        if (game)
        {
            game.events.on('SCENE_CONSTRUCTED', () =>
            {
                console.log('Scene constructed event')
                setGlobalState('isPhaserGameLoaded', true)
                Telegram.WebApp.ready();
            })

        }
    }, [game])

    return (
        <>
            <div hidden={!isPhaserGameLoaded} className={'gameContainer'} ref={gameRef}></div>
        </>

    )


}