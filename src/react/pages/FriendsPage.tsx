import React from 'react';
import { useNavigate } from "react-router-dom";


export default function FriendsPage() {
    const navigate = useNavigate()
    var BackButton = Telegram.WebApp.BackButton;
    BackButton.show();
    BackButton.onClick(function() {
        BackButton.hide();

    });
    Telegram.WebApp.onEvent('backButtonClicked', function() {
        navigate('/')
    });

    return(
        <>
            <div className={'friends-background-container'}>
                <span className={'background__circle'}></span>
            </div>


            <div className={'friends-main-container'}>
                <h2 className={"main__text"} style={{fontSize:'6vh', marginBottom: 0}}>138 friends</h2>
                <p className={"main__text"} style={{fontSize:'3vh', marginTop: 0}}>Invite friends and get points!</p>
                <p className={"main__text"} style={{fontSize:"3vh"}}>+0 $DINO</p>
            </div>


        </>
    )

}