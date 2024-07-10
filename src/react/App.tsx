import React, {useEffect, useState} from "react";
import Game from "./components/Game";
import CoinsText from "./components/CoinsText";
import Button from "./components/Button";
import 'animate.css'
import {motion} from "framer-motion"
import MainScene from "../game/scenes/mainScene";


const startButtonAnimationVariants = {
    visible: {scale: 1, opacity: 100},
    hidden: {scale: 0, opacity: 0},
}

function App()
{
    const [isGameLoaded, setIsGameLoaded] = useState(false)
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [coins, setCoins] = useState(0);
    const [game, setGame] = useState<Phaser.Game>(null);

    useEffect(() =>
    {
        if (game)
        {
            game.events.on('GAME_LOOSED', () =>
            {
                setIsGameStarted(false)
            })
            game.events.on('GAME_START_INITIALIZED', () =>
            {
                setIsGameStarted(true)
            })

            game.events.on('COINS_CHANGED', (coins) =>
            {
                setCoins(coins)
            })

        }

    })


    return (
        <>
            <Game onGameLoaded={(game) =>
            {
                setGame(game)
                setIsGameLoaded(true)
            }}>
            </Game>
            {isGameLoaded && <CoinsText coins={coins}></CoinsText>}
            {
                isGameLoaded &&
                <motion.div
                    className={'startButton-ctn'}
                    variants={startButtonAnimationVariants}
                    animate={isGameStarted ? "hidden" : "visible"}
                    initial="hidden"
                    transition={{type: "spring", stiffness: 60}}
                >
                    <Button className={'startButton'} disabled={false} onClick={() =>
                    {
                        setIsGameStarted(true)
                        game.scene.getScene<MainScene>('mainScene').initGameStart();
                        console.log('Click')
                    }}>START</Button>
                </motion.div>
            }


        </>
    )
}

export default App