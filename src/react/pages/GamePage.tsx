import React, {useEffect, useState} from "react";
import 'animate.css'
import {motion} from "framer-motion"
import Game from "../components/Game";
import CoinsText from "../components/CoinsText";
import Button from "../components/Button";
import MainScene from "../../game/scenes/mainScene";
import BottomMenu from "../components/BottomMenu";
import {useGlobalState} from "../globalStates";

const startButtonAnimationVariants = {
    visible: {scale: 1, opacity: 100},
    hidden: {scale: 0, opacity: 0},
}


export default function GamePage() {
    const [isGameLoaded] = useGlobalState('isPhaserGameLoaded');
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [coins, setCoins] = useState(0);
    const [game] = useGlobalState('phaserGame');

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

    }, [game])
    return (
        <>
            <Game/>
            {isGameLoaded && <CoinsText coins={coins}></CoinsText>}
            {
                isGameLoaded &&
                <motion.div
                    className={'startButton-ctn'}
                    variants={startButtonAnimationVariants}
                    animate={isGameStarted ? "hidden" : "visible"}
                    initial="hidden"
                    transition={{type: "spring", stiffness:60 }}
                >
                    <Button className={'startButton'} disabled={false} onClick={() =>
                    {
                        setIsGameStarted(true)
                        // @ts-ignore
                        game.scene.getScene<MainScene>('mainScene').initGameStart();
                        console.log('Click')
                    }}>START</Button>
                </motion.div>
            }
            {isGameLoaded && <BottomMenu hidden={isGameStarted}></BottomMenu>}
        </>
    )

}