import { Avatar, IconButton, List, ListItem, ListItemButton, ListItemText, Popover, Typography } from '@mui/material'
import classNames from 'classnames';
import { useCallback, useContext, useMemo, useState } from 'react';
import { AppContext } from 'src/context/AppContext';
import { LoginContext } from 'src/context/LoginContext';
import { ChatContext, ForwardMessage } from 'src/context';

import { useMutation } from "@apollo/client"

import ShortcutIcon from '@mui/icons-material/Shortcut';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { DELETE_DIRECT_MESSAGE } from "src/graphql/mutations"
import { getDate } from "src/helpers"

library.add(faCheckDouble);

const ReadIcon = ({ isLoggedUser, isRead }) => {
    return (
        <FontAwesomeIcon 
            className={classNames(isLoggedUser ? "ml-2" : "mr-2", isRead ? "text-cyan-500" : "text-slate-500")}
            icon="fa-solid fa-check-double" 
        />
    );
};

const Container = ({ createdAt, chatIDRef, dest, ID, isDeleted, isForwarded, isRead, image, message, sender, text }) => {
    const { loggedUser } = useContext(LoginContext)
    const { getUsersList, serverPublicURL } = useContext(AppContext);
    const { addMessageVariables, setOpenForwardMessageDialog, setDirectContact } = useContext(ForwardMessage);
    const { setRepliedMessage } = useContext(ChatContext);

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

    const replyHandler = useCallback(() => {
        handleClose();
        setRepliedMessage(message);
    }, [ handleClose, message, setRepliedMessage ])

    const forwardHandler = useCallback(() => {
        addMessageVariables({
            chatID: "",
            image,
            isForwarded: true,
            reply: "",
            text: text
        });
        setDirectContact(dest);
        setAnchorEl(null);
        setOpenForwardMessageDialog(true);
    }, [ addMessageVariables, dest, image, setDirectContact, text, setOpenForwardMessageDialog ])

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

    const destinatary = useMemo(() => {
        const result = getUsersList()?.find(item => item.username === sender);

        if(result) return result;
        return {};
    }, [ getUsersList, sender ]);

    return (
        <article className={classNames("flex mb-4 w-full", loggedUser.username === sender ? "justify-end" : "")}>
            <div className={classNames("flex items-end")}>
                <Avatar 
                    className={classNames("mb-4", { "hidden": loggedUser.username === sender })}
                    src={`${serverPublicURL.current}/${destinatary.image}`}
                />
                <div className={classNames("", { "ml-3": loggedUser.username !== sender})}>
                    { isForwarded && <Typography className="flex items-center text-xs text-slate-500">
                        <ShortcutIcon /> forwarded
                    </Typography> }
                    <div className={classNames("flex flex-col min-w-[120px] pt-1 pb-3 px-4 rounded-2xl", 
                        loggedUser.username !== sender ? "other-message rounded-bl-none": "user-message rounded-br-none",
                        isDeleted ? "deleted-message" : "")}>
                        <IconButton disabled={isDeleted} className="p-0 self-end" onClick={handleClick}>
                            <MoreHorizIcon />
                        </IconButton>
                        <Typography>
                            { isDeleted ? "This message was deleted" : text }
                        </Typography>
                    </div>
                    <Typography className={classNames("mt-[4px] text-xs text-slate-300", loggedUser.username !== sender ? "" : "text-right")}>
                        { sender !== loggedUser.username && <ReadIcon isRead={isRead}  /> }
                        { getDate(new Date(parseInt(createdAt))) } 
                        { sender === loggedUser.username && <ReadIcon isLoggedUser isRead={isRead} /> }
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
                            onClick={replyHandler} 
                            className={classNames()}>
                            <ListItemButton>
                                <ListItemText 
                                    primary="Reply" 
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem 
                            disablePadding 
                            onClick={forwardHandler} 
                            className={classNames()}>
                            <ListItemButton>
                                <ListItemText 
                                    primary="Forward" 
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem 
                            disablePadding 
                            onClick={deleteHandler} 
                            className={classNames()}>
                            <ListItemButton disabled={ sender !== loggedUser.username }>
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