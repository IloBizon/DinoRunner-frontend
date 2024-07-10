import React, {useEffect, useState} from 'react'
import {Game} from 'phaser'

export function useGame(
    config: Phaser.Types.Core.GameConfig,
    containerRef: React.MutableRefObject<HTMLDivElement>,
): Phaser.Game | undefined
{
    const [game, setGame] = useState<Game>()

    useEffect(() =>
    {
        if (!game)
        {
            const newGame = new Game({...config})
            containerRef.current.append(newGame.canvas)
            setGame(newGame)
        }
    }, [config, containerRef, game])


    return game
}