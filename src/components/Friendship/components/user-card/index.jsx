import { Chip, IconButton, Typography } from "@mui/material";
import { useCallback, useContext, useMemo, useRef } from "react";
import { AppContext, LoginContext } from "src/context";
import classNames from 'classnames'
import Link from "next/link"
import { useRouter } from "next/router"

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import classes from '../styles/card.module.css'

import Avatar from "src/components/avatar"
import Dialog from "./components/dialog"

const Container = ({ image, name, username }) => {
    const { getFriendshipInvitationsList } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext);
    const { pathname } = useRouter();

    const hasInvitationSent = useMemo(() => {
        return getFriendshipInvitationsList().find(invitation => {
            const filters = [ username, loggedUser.username ];
            return filters.includes(invitation.sender.username) && filters.includes(invitation.target.username);
        })
    }, [ getFriendshipInvitationsList, loggedUser, username ]);

    
    const openDialog = useRef(null);
    const clickHandler = useCallback(() => {
        if(openDialog.current) {
            openDialog.current();
        }
    }, [])

    return (
        <li className={classNames(classes.card, `flex items-center py-2 sm:px-3 last:border-0 
            sm:last:border sm:mb-4 md:last:border-0 md:mb-0 md:px-0`)}>
            <Avatar 
                image={image}
            />
            <div className="flex flex-col grow ml-3">
                <Typography 
                    className={classNames(classes.name, { [classes.nameHome]: pathname === "/" },
                    "font-semibold overflow-hidden text-transition text-ellipsis whitespace-nowrap dark:text-slate-300")} 
                    component="h2">
                    { name }
                </Typography>
                <Link href={`profile?username=${username}`}>
                    <a className="mt-1 text-black text-transition dark:text-slate-500 hover:text-cyan-500">
                        <Typography className={classNames(classes.name, { [classes.nameHome]: pathname === "/" },
                            "overflow-hidden text-ellipsis whitespace-nowrap")}>
                            @{ username }
                        </Typography>
                    </a>
                </Link>
            </div>
            {
                hasInvitationSent ? (
                    <Chip color="primary" label="pending" variant="outlined" />
                ) : (
                    <IconButton 
                        className="ml-3"
                        onClick={clickHandler}>
                        <PersonAddIcon className="opacity-80 text-blue-600" />
                    </IconButton>
                )
            }
            <Dialog name={name} openDialog={openDialog} username={username}  />
        </li>
    );
};

export default Container;