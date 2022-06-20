import { useCallback, useContext, useState } from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import Head from 'next/head';
import classNames from "classnames"

import { AppContext } from "src/context/AppContext";
import { FriendshipContext } from 'src/context/FriendshipContext';

import Card  from "../friendship-invitation-card"

const FriendshipInvitations = () => {
    const { getFriendshipInvitationsList } = useContext(AppContext)
    const { filterOptions, searchFriendsFilter } = useContext(FriendshipContext)
    
    return (
        <ul className={classNames("list-none px-5 mt-6", { 'hidden': searchFriendsFilter !== filterOptions.current.invitations })}>
            {
                getFriendshipInvitationsList().map((item, index) => (
                    <Card key={item.username} { ...item } />
                ))
            }
        </ul>
    );
};

export default FriendshipInvitations;