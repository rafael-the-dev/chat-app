import { Avatar, IconButton, List, ListItem, ListItemButton, ListItemText, Popover, Typography } from '@mui/material'
import classNames from 'classnames';
import { useCallback, useContext, useState } from 'react';
import { AppContext } from 'src/context/AppContext';
import { LoginContext } from 'src/context/LoginContext';

import { useMutation } from "@apollo/client"

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { DELETE_DIRECT_MESSAGE } from "src/graphql/mutations"
import { getDate } from "src/helpers"

const Container = ({ createdAt, chatIDRef, dest, ID, isDeleted, image, sender, text }) => {
    const { user } = useContext(LoginContext)
    const { getInitialsNameLetters, serverPublicURL } = useContext(AppContext);

    const deleteMutation = useMutation(DELETE_DIRECT_MESSAGE)

    const [ anchorEl, setAnchorEl] = useState(null);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    
    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const forwardHandler = useCallback(() => {}, []);

    const deleteHandler = useCallback(() => {
        const deleteMessage = deleteMutation[0];

        deleteMessage({ 
            variables: {
                chatID: chatIDRef.current,
                destinatary: dest,
                messageID: ID
            },
            onCompleted() {
                handleClose();
            },
            onError(error) {
                console.log(error)
            }
        })
    }, [ chatIDRef, deleteMutation, dest, handleClose, ID ])

    return (
        <article className={classNames("flex mb-4 w-full", user.username === sender ? "justify-end" : "")}>
            <div className={classNames("flex items-end")}>
                <Avatar 
                    className={classNames("mb-4", { "hidden": user.username === sender })}>
                    { getInitialsNameLetters(user ? user.name : "" )}
                </Avatar>
                <div className={classNames("", { "ml-3": user.username !== sender})}>
                    <div className={classNames("flex flex-col min-w-[120px] pt-1 pb-3 px-4 rounded-2xl", 
                        user.username !== sender ? "other-message rounded-bl-none": "user-message rounded-br-none",
                        isDeleted ? "deleted-message" : "")}>
                        <IconButton disabled={isDeleted} className="p-0 self-end" onClick={handleClick}>
                            <MoreHorizIcon />
                        </IconButton>
                        <Typography>
                            { isDeleted ? "This message was deleted" : text }
                        </Typography>
                    </div>
                    <Typography className={classNames("mt-[4px] text-xs text-slate-300", user.username !== sender ? "" : "text-right")}>
                        { getDate(new Date(parseInt(createdAt))) }
                    </Typography>
                </div>
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
                    <List className={classNames("py-0 w-[170px]")}>
                        <ListItem 
                            disablePadding 
                            onClick={forwardHandler} 
                            className={classNames()}>
                            <ListItemButton disabled={ sender !== user.username }>
                                <ListItemText 
                                    primary="Forward" 
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem 
                            disablePadding 
                            onClick={deleteHandler} 
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
            </div>
        </article>
    );
};

export default Container;