import { Avatar, Button, Hidden, Typography } from "@mui/material"
import classNames from "classnames"
import { useContext, useId } from "react"
import Head from 'next/head';
import Link from "next/link"
import classes from "./styles.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppContext, LoginContext } from "src/context"
import Card from "./components/group-invitation-card"

const GroupsInvitations = () => {
    const { loggedUser } = useContext(LoginContext)
    const { getGroupsInvitations, serverPublicURL } = useContext(AppContext);

    const id = useId();

    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <Hidden mdUp>
                <header className="bg-cyan-700 flex fixed items-center justify-between px-5 py-2 top-0 left-0 w-full z-10">
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
            </Hidden>
            <div className="pt-16 pb-20 scroll-smooth md:pt-0 md:grow">
                <div className="pl-2 pt-2">
                    <Link href="chat?subtab=group-chat">
                        <a>
                            <Button
                                startIcon={<ArrowBackIcon className="" />}>
                                Back
                            </Button>
                        </a>
                    </Link>
                </div>
                <ul 
                    className={classNames(classes.invitationsList, 
                    "pt-2 overflow-y-auto pb-6 sm:flex sm:flex-wrap sm:justify-between sm:px-4 md:flex-col md:justify-start")}>
                    {
                        getGroupsInvitations().map((group, index) => (
                            <Card key={`${id}-${index}`} { ...group } />
                        ))
                    }
                </ul>
            </div>
        </>
    );
};

export default GroupsInvitations;