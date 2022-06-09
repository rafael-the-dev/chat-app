import { Avatar, Button, IconButton, Typography } from "@mui/material"
import classNames from "classnames"
import { useContext } from "react"
import Head from 'next/head';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppContext, LoginContext } from "src/context"
import Card from "./components/group-invitation-card"

const GroupsInvitations = () => {
    const { loggedUser } = useContext(LoginContext)
    const { getGroupsInvitations, serverPublicURL } = useContext(AppContext);

    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <header className="bg-cyan-700 flex items-center justify-between px-5 py-2">
                <Typography
                    className="font-bold text-slate-100 text-2xl uppercase" 
                    component="h1">
                    Chat app
                </Typography>
                <Avatar 
                    className={classNames({ "bg-cyan-500": !Boolean(loggedUser.image) })}
                    src={loggedUser.image ? `${serverPublicURL.current}/${loggedUser.image}` : ""}>
                </Avatar>
            </header>
            <div>
                <div className="pl-2 pt-2">
                    <Button
                        startIcon={<ArrowBackIcon className="" />}>
                        Back
                    </Button>
                </div>
                <ul className="pt-4 pb-6 px-5">
                    {
                        getGroupsInvitations().map(group => (
                            <Card key={group.ID} { ...group } />
                        ))
                    }
                </ul>
            </div>
        </>
    );
};

export default GroupsInvitations;