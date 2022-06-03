import { Avatar, Icon, IconButton, Typography } from "@mui/material";
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { AppContext } from "src/context/AppContext";
import classNames from 'classnames'
import classes from './styles.module.css'

import { getDate } from "src/helpers"

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMutation } from "@apollo/client";
import { ACCEPT_FRIENDSHIP_INVITATION, REJECT_FRIENDSHIP_INVITATION } from "src/graphql/mutations";
import { GET_FRIENDSHIPS_INVITATIONS } from "src/graphql/queries";

const FriendshipInvitaitonCard = ({ description, ID, datetime, image, sender }) => {
    const { getInitialsNameLetters, getBgColors } = useContext(AppContext);
    const [ expanded, setExpanded ] = useState(false);

    const acceptFriendshipMutation = useMutation(ACCEPT_FRIENDSHIP_INVITATION, { 
        refetchQueries: [ GET_FRIENDSHIPS_INVITATIONS ]
    });

    const rejectMutation = useMutation(REJECT_FRIENDSHIP_INVITATION, { 
        refetchQueries: [ GET_FRIENDSHIPS_INVITATIONS ]
    });
    
    const toggleExpanded = useCallback(() => setExpanded(b => !b), []);

    const hasDescription = useMemo(() => {
        if(!Boolean(description)) return false;
        return description.trim().length > 0;
    }, [ description ]);

    const acceptFriendshipInvitation = useCallback(() => {
        const acceptInvitation = acceptFriendshipMutation[0];
        acceptInvitation({ 
            variables: {
                id: ID
            },
            onError(err) {
                console.log(err)
            }
        });
    }, [ ID, acceptFriendshipMutation ])

    const rejectFriendshipInvitation = useCallback(() => {
        const rejectInvitation = rejectMutation[0];
        rejectInvitation({ 
            variables: {
                id: ID
            },
            onError(err) {
                console.log(err)
            }
        });
    }, [ ID, rejectMutation ])

    return (
        <li className={classNames(classes.card, `flex flex-col pt-3 pb-2 last:border-0`)}>
                <div className="flex items-center">
                    <Avatar 
                        className="h-[50px] text-base w-[50px]"
                        src={sender.image ? `http://localhost:5000/${sender.image}` : ""}
                        style={{ backgroundColor: image ? "transparent" : getBgColors()[sender.username] }} 
                        variant="square">
                        { sender.image ? "" :getInitialsNameLetters(sender.name) }
                    </Avatar>
                    <div className="flex flex-col grow ml-3">
                        <div className="flex items-center justify-between">
                            <Typography 
                                className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                                component="h2">
                                { sender.name }
                            </Typography>
                            <Typography className={classNames("text-sm")}>
                                { getDate(new Date(parseInt(datetime))) }
                            </Typography>
                        </div>
                        <div className="flex items-center justify-between">
                            <Typography className={classNames()}>
                                @{ sender.username }
                            </Typography>
                            <div className="flex items-center">
                                <IconButton 
                                    className="p-[5px]"
                                    onClick={rejectFriendshipInvitation}>
                                    <CloseIcon className="opacity-80 text-red-500" />
                                </IconButton>
                                <IconButton 
                                    className="ml-2 p-[5px]"
                                    onClick={acceptFriendshipInvitation}>
                                    <CheckIcon className="opacity-80 text-blue-600" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
                { hasDescription && (
                    <>
                        <div className="flex items-center justify-between">
                            <Typography className="" component="h3">
                                Description 
                            </Typography>
                            <IconButton onClick={toggleExpanded}>
                                { expanded ? <KeyboardArrowDownIcon className={classes.iconRotate} /> : <KeyboardArrowDownIcon className="" />}
                            </IconButton>
                        </div>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Typography className="text-gray-700">
                                { description } 
                            </Typography>
                        </Collapse>
                    </>
                )}
        </li>
    );
};

export default FriendshipInvitaitonCard;