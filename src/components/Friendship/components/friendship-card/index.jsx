import { Avatar, Icon, IconButton, Typography } from "@mui/material";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { AppContext } from "src/context/AppContext";
import classNames from 'classnames'
import classes from './styles.module.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';

import { useMutation } from "@apollo/client";
import { REJECT_FRIENDSHIP_INVITATION } from "src/graphql/mutations";
import { GET_FRIENDSHIPS_INVITATIONS } from "src/graphql/queries";

const FriendshipInvitaitonCard = ({ isOnline, image, name, username }) => {
    const { getInitialsNameLetters, getBgColors } = useContext(AppContext);

    const rejectMutation = useMutation(REJECT_FRIENDSHIP_INVITATION, { 
        refetchQueries: [ GET_FRIENDSHIPS_INVITATIONS ]
    });


    return (
        <article className={classNames(classes.card, `flex flex-col pt-3 pb-2 last:border-0`)}>
                <div className="flex items-center">
                    <Avatar 
                        className="h-[50px] text-base w-[50px]"
                        src={image ? `http://localhost:5000/${image}` : ""}
                        style={{ backgroundColor: image ? "transparent" : getBgColors()[username] }}>
                        { image ? "" :getInitialsNameLetters(name) }
                    </Avatar>
                    <div className="flex flex-col grow ml-3">
                        <div className="flex items-center justify-between">
                            <Typography 
                                className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                                component="h2">
                                { name }
                            </Typography>
                            <IconButton className="p-0">
                                <MoreHorizIcon />
                            </IconButton>
                        </div>
                        <div className="flex items-center justify-between">
                            <Typography className={classNames()}>
                                @{ username }
                            </Typography>
                            <CircleIcon className={classNames("text-[.6rem] mr-[2px]", isOnline ? "text-green-500" : "text-red-500")} />
                        </div>
                    </div>
                </div>
        </article>
    );
};

export default FriendshipInvitaitonCard;