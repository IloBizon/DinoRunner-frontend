import React, {useEffect} from "react";
import {CoinManager} from "../../game/classes/coinManager";
import {useCountUp} from "react-countup";
import {motion} from "framer-motion"


interface CoinsTextProps
{
    coins: number
}

export default function CoinsText({coins}: CoinsTextProps)
{
    const countUpRef = React.useRef(null);
    let {update: updateText} = useCountUp({ref: countUpRef, end: 0, separator: '.'})

    async function getCoins()
    {
        const coins = await CoinManager.getInstance().getCoins()
        Telegram.WebApp.showAlert(`Coins: ${coins}`)
        updateText(coins)
    }

    useEffect(() =>
    {
        updateText(coins)
    }, [coins])
    useEffect(() =>
    {
        getCoins()
    }, [])


    return (
        <>
            <motion.div
                className={'coinTextDiv'}
                animate={{scale: 1, opacity: 100}}
                initial={{scale: 0, opacity: 0}}
                transition={{type: "spring", stiffness: 60}}>
                <img src='../../../static/testobj/coin.png' alt="iconImg" className={'coinImage'}/>
                <div className={'coinText'} ref={countUpRef}></div>
                {/*<CountUp separator={'.'} duration={3} start={0} end={coins} preserveValue={true}*/}
                {/*         className={'coinText'}></CountUp>*/}
            </motion.div>
        </>
    )
}
