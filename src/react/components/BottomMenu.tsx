import { motion } from "framer-motion";
import {useEffect, useRef, useState} from "react";
import React from "react";
import {Link} from "react-router-dom";

interface BottonMenuProps {
    hidden: boolean
}

const animationVariants = {
    visible: {y:0},
    hidden: {y:"11vh"},
}

export default function BottomMenu({hidden}: BottonMenuProps) {

    let [isHidden, setIsHidden] = useState<boolean>(false);
    useEffect(() => {
        setIsHidden(hidden);
    }, [hidden]);

    return (
        <>
            <motion.nav
                className={'nav'}
                variants={animationVariants}
                initial="hidden"
                animate={isHidden ? "hidden" : "visible"}
                transition={{type: "spring", stiffness: 60 }}>

                <a href="#" className="nav__link">
                    <img src="../static/images/UI/navigationBar/human.png" className="nav__icon"
                         alt="Profile icon"></img>
                    <span className="nav__text">Profile</span>
                </a>
                <img src="../static/images/UI/navigationBar/separator.png" className="separator"/>

                <a href="#" className="nav__link">
                    <img src="../static/images/UI/navigationBar/coin.png" className="nav__icon" alt="Coin icon"></img>
                    <span className="nav__text">Earn</span>
                </a>
                <img src="../static/images/UI/navigationBar/separator.png" className="separator"/>
                <a href="#" className="nav__link">
                    <img src="../static/images/UI/navigationBar/rocket.png" className="nav__icon"
                         alt="Rocket icon"></img>
                    <span className="nav__text">Boosts</span>
                </a>
                <img src="../static/images/UI/navigationBar/separator.png" className="separator"/>
                <Link to={'/friends'} className="nav__link">
                    <img src="../static/images/UI/navigationBar/hands.png" className="nav__icon"
                         alt="Profile icon"></img>
                    <span className="nav__text">Friends</span>
                </Link>
            </motion.nav>
        </>
    )


}