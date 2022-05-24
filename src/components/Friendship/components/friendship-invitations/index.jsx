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
        <div className={classNames("px-5 mt-6", { 'hidden': searchFriendsFilter !== filterOptions.current.invitations })}>
            {
                getFriendshipInvitationsList().map((item, index) => (
                    <Card key={index} { ...item } />
                ))
            }
        </div>
    );
};

export default FriendshipInvitations;