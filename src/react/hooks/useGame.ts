import React, {useEffect, useState} from 'react'
import {Game} from 'phaser'
import {useGlobalState, setGlobalState} from "../globalStates";
import {GameComponent} from "../../game/classes/gameComponent";


export function useGame(
    config: Phaser.Types.Core.GameConfig,
    containerRef: React.MutableRefObject<HTMLDivElement>,
)
{
    const [phaserGame] = useGlobalState('phaserGame');
    useEffect(() =>
    {
        if (!phaserGame)
        {
            console.log('new game')
            const newGame = GameComponent.getInstance().getGame(config);
            containerRef.current.append(newGame.canvas)
            setGlobalState('phaserGame', newGame);
        }
        else {
            containerRef.current.append(phaserGame.canvas)
        }
    }, [])

    return phaserGame;
}