import { Avatar, Badge, Collapse, IconButton, List, ListItem, ListItemButton, ListItemText, Popover, Typography } from "@mui/material";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { AppContext } from "src/context/AppContext";
import classNames from 'classnames'
import classes from './styles.module.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
//import CircleIcon from '@mui/icons-material/Circle';

import { useMutation } from "@apollo/client";
import { REJECT_FRIENDSHIP_INVITATION } from "src/graphql/mutations";
import { GET_FRIENDSHIPS_INVITATIONS } from "src/graphql/queries";

import Input from "./components/Input"

const FriendshipInvitaitonCard = ({ isOnline, image, name, username }) => {
    const { getInitialsNameLetters, getBgColors } = useContext(AppContext);
    const [ anchorEl, setAnchorEl] = useState(null);
    const [ expanded, setExpanded ] = useState(false);

    const rejectMutation = useMutation(REJECT_FRIENDSHIP_INVITATION, { 
        refetchQueries: [ GET_FRIENDSHIPS_INVITATIONS ]
    });

    const toggleExpanded = useCallback(prop => () => {
        setExpanded(prop);
        setAnchorEl(null);
    }, [])

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const listItemClickHandler = useCallback(prop => () => {
    }, [  ]);
    
    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const inputMemo = useMemo(() => <Input closeInput={toggleExpanded(false)} />, [ toggleExpanded ])


    return (
        <article className={classNames(classes.card, `flex flex-col pt-3 pb-2 last:border-0`)}>
            <div className="flex items-center">
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    color="secondary"

                    classes={{ badge: classNames("bottom-[5px] right-[5px]", isOnline ? "bg-green-500" : "bg-red-500") }}
                    variant="dot"
                >
                    <Avatar 
                        className="h-[50px] text-base w-[50px]"
                        src={image ? `http://localhost:5000/${image}` : ""}
                        style={{ backgroundColor: image ? "transparent" : getBgColors()[username] }}>
                        { image ? "" :getInitialsNameLetters(name) }
                    </Avatar>
                </Badge>
                <div className="flex flex-col grow ml-3">
                    <div className="flex justify-between">
                        <Typography 
                            className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                            component="h2">
                            { name }
                        </Typography>
                        <IconButton className="p-0" onClick={handleClick}>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                        <Typography className={classNames()}>
                            @{ username }
                        </Typography>
                    </div>
                </div>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                { inputMemo }
            </Collapse>
            <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClose}
                classes={{ paper: ""}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List className={classNames("pt-0 w-[230px]")}>
                    <ListItem 
                        disablePadding 
                        onClick={listItemClickHandler()} 
                        className={classNames()}>
                        <ListItemButton onClick={toggleExpanded(true)}>
                            <ListItemText 
                                classes={classNames("Direct chat")} 
                                primary="Quick message" 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem 
                        disablePadding 
                        onClick={listItemClickHandler()} 
                        className={classNames()}>
                        <ListItemButton>
                            <ListItemText 
                                classes={{}} 
                                primary="Go to chat" 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem 
                        disablePadding 
                        onClick={listItemClickHandler()} 
                        className={classNames()}>
                        <ListItemButton>
                            <ListItemText 
                                className={classNames('text-red-500')} 
                                primary="Delete" 
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </article>
    );
};

export default FriendshipInvitaitonCard;