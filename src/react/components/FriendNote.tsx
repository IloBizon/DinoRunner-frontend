import React from 'react';

export interface FriendNoteProps {
    userName:string,
    bringToInviter: number
}


export default function FriendNote ({userName, bringToInviter}:FriendNoteProps) {

    return(
        <>
            <li className={'friend--note--container'}>
                <span className={'friend__avatar'}>{userName.charAt(0).toUpperCase()}</span>
                <p className={'friend__name'}>{userName}</p>
                <p className={'friend__earn'}>+{bringToInviter} $DINO</p>
            </li>

        </>
    )

}