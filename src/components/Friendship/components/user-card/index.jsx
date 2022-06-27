import { Avatar, Chip, IconButton, Typography } from "@mui/material";
import { useCallback, useContext, useMemo, useRef } from "react";
import { AppContext, LoginContext } from "src/context";
import classNames from 'classnames'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import classes from './styles.module.css'

import Dialog from "./components/dialog"

const Container = ({ image, name, username }) => {
    const { getFriendshipInvitationsList, getInitialsNameLetters, getBgColors } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext);

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
        <li className={classNames(classes.card, `flex items-center py-2 last:border-0`)}>
            <Avatar 
                imgProps={{ loading: "lazy" }}
                src={image ? `http://localhost:5000/${image}` : ""}
                style={{ backgroundColor: image ? "transparent" : getBgColors()[username] }} 
                className="text-base">
                { image ? "" :getInitialsNameLetters(name) }
            </Avatar>
            <div className="flex flex-col grow ml-3">
                <Typography 
                    className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                    component="h2">
                    { name }
                </Typography>
                <Typography className={classNames("mt-1")}>
                    @{ username }
                </Typography>
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