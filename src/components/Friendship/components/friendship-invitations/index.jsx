import { useCallback, useContext, useState } from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import Head from 'next/head';
import classNames from "classnames"
import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from "src/context/AppContext";

import Card  from "../friendship-invitation-card"

const FriendshipInvitations = () => {
    const { getFriendshipInvitationsList, getInitialsNameLetters } = useContext(AppContext)
    
    return (
        <>
            {
                getFriendshipInvitationsList().map((item, index) => (
                    <Card key={index} { ...item } />
                ))
            }
        </>
    );
};

export default FriendshipInvitations;