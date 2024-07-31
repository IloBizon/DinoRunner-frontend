import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Button from "../components/Button";
import FriendNote, {FriendNoteProps} from "../components/FriendNote";
import {AuthManager} from "../../game/classes/authManager";
import {QueryClient, useInfiniteQuery} from '@tanstack/react-query'

export default function FriendsPage() {
    const navigate = useNavigate()
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    var BackButton = Telegram.WebApp.BackButton;
    BackButton.show();
    BackButton.onClick(function() {
        BackButton.hide();

    });
    Telegram.WebApp.onEvent('backButtonClicked', async function() {
        document.body.style.overflowY = "hidden";
        await sleep(500)
        navigate('/')
    });

    const [isFriendsLoaded, setIsFriendsLoaded] = React.useState(false);
    const [friends, setFriends] = React.useState<FriendNoteProps[]>([]);

    const queryClient = new QueryClient()

    async function getFriends()
    {
        const backendIP = process.env.BACKEND_IP;
        const url: string = `https://${backendIP}/users/get-friends`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthManager.getInstance().getAuthToken()}`
            },
        })
        const friends: FriendNoteProps[] = await response.json();
        setFriends(friends);
    }


    useEffect(() => {

        document.body.style.overflowY = "scroll";
        getFriends();
        }, []);


    function shareButtonOnClick()
    {
        Telegram.WebApp.openLink(`https://t.me/share/url?url=https://t.me/runnerton_bot/join?startapp=${Telegram.WebApp.initDataUnsafe.user.id}&text=Play TONRunner with me!`)
    }


    return(
        <>
            <div className={'friends-background-container'}>
                <span className={'background__circle'}></span>
            </div>


            <div className={'friends-text-main-container'}>
                <h2 className={"main__text"} style={{fontSize:'7vw', marginBottom: 0}}>Invite Friends and Earn</h2>
                <p className={"main__text"} style={{fontSize:'4vw', marginTop: 0}}>Get 10% from your friend’s points</p>
                <p className={"main__text"} style={{fontSize:"3vh"}}>+0 $DINO</p>
            </div>

            <div className={'share--button--container'}>
                <Button className={'share--button'} onClick={shareButtonOnClick}>Invite friends</Button>
            </div>


            <p className={'friends-counter'}>{friends.length} friends</p>
           <ul className={'friends-container'}>
               {friends.map(friend => <FriendNote userName={friend.userName} bringToInviter={friend.bringToInviter} />)}
           </ul>
        </>
    )

}