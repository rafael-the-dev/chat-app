import { IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import classNames from 'classnames';
import Image from "next/image"
import { useCallback, useContext, useMemo, useRef } from 'react';
import { AppContext } from 'src/context/AppContext';
import { LoginContext } from 'src/context/LoginContext';
import { ChatContext, ForwardMessage } from 'src/context';

import { useMutation } from "@apollo/client"

import ShortcutIcon from '@mui/icons-material/Shortcut';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import RepliedMessage from "../replied-message"
import { DELETE_DIRECT_MESSAGE, DELETE_GROUP_MESSAGE } from "src/graphql/mutations"
import { getDate, getURL } from "src/helpers"

import IsReadCard from "./components/is-read-card"
import Avatar from "./components/avatar"
import Popover from "src/components/popover"

library.add(faCheckDouble);

const ReadIcon = ({ isDeleted, isLoggedUser, isRead }) => {
    return (
        <FontAwesomeIcon 
            className={classNames(isLoggedUser ? "ml-2" : "mr-2", isRead ? "text-cyan-500" : "text-slate-500", { "hidden": isDeleted })}
            icon="fa-solid fa-check-double" 
        />
    );
};

const Container = ({ createdAt, chatIDRef, dest, ID, isDeleted, isDateChanged, isDirectChat, isForwarded, isRead, image, 
    message, messages, messageIndex, reply, sender, text }) => {
    const { loggedUser } = useContext(LoginContext)
    const { getUsersList } = useContext(AppContext);
    const { addMessageVariables, setOpenForwardMessageDialog, setForwardDetails } = useContext(ForwardMessage);
    const { setRepliedMessage } = useContext(ChatContext);

    const deleteMutation = useMutation(DELETE_DIRECT_MESSAGE)
    const deleteGroupMessageMutation = useMutation(DELETE_GROUP_MESSAGE);

    const onClickRef = useRef(null);
    const onCloseRef = useRef(null);

    const replyHandler = useCallback(() => {
        onCloseRef.current?.();
        setRepliedMessage({ ...message, isDirectChat });
    }, [ isDirectChat, message, setRepliedMessage ])

    const messageCardType = useMemo(() => {
        const isGreaterThanMessagesSize = (messageIndex + 1) > (messages.length - 1);
        const isInvalid = (messageIndex - 1 === -1);
        if(isDateChanged || isInvalid) return "NORMAL";

        const lastMessageSender = messages[messageIndex - 1].sender;
        const currentMessageSender = messages[messageIndex].sender;

        if(isGreaterThanMessagesSize) {
            if(currentMessageSender === lastMessageSender) return "EQUAL_TO_LAST"
            return "NORMAL";
        }

        const nextMessageSender = messages[messageIndex + 1].sender;
        const currentMessageDay = new Date(parseInt(createdAt)).getDate();
        const nextMessageDay = new Date(parseInt(messages[messageIndex + 1].createdAt)).getDate();

        if(currentMessageSender === lastMessageSender && currentMessageSender === nextMessageSender) {
            return nextMessageDay === currentMessageDay ? "EQUAL_TO_BOTH" : "EQUAL_TO_LAST";
        }

        if(currentMessageSender === lastMessageSender) {
            return nextMessageDay === currentMessageDay ? "EQUAL_TO_LAST" : "NORMAL";
        }


    }, [ createdAt, isDateChanged, messages, messageIndex ]);

    const borderClasses = useMemo(() => {
        const isLoggedUserSender = loggedUser.username === sender;

        switch(messageCardType) {
            case "EQUAL_TO_LAST": {
                return !isLoggedUserSender ? "other-message rounded-tl-none": "user-message rounded-tr-none"
            }
            case "EQUAL_TO_BOTH": {
                return !isLoggedUserSender ? "other-message rounded-l-none": "user-message rounded-r-none"
            }
            default: {
                return !isLoggedUserSender ? "other-message rounded-bl-none": "user-message rounded-br-none"
            }

        }
    }, [loggedUser, messageCardType, sender ])

    const forwardHandler = useCallback(() => {
        addMessageVariables({
            chatID: "",
            image,
            isForwarded: true,
            reply: "",
            text: text
        });
        setForwardDetails({ directContact: dest, group: chatIDRef.current });
        onCloseRef.current?.();
        setOpenForwardMessageDialog(true);
    }, [ addMessageVariables, chatIDRef, dest, image, setForwardDetails, text, setOpenForwardMessageDialog ])

    const deleteHandler = useCallback(() => {
        const deleteMessage = deleteMutation[0];

        deleteMessage({ 
            variables: {
                chatID: chatIDRef.current,
                destinatary: dest,
                messageID: ID
            },
            onCompleted() {
                onCloseRef.current?.();
            },
            onError(error) {
                console.error(error)
            }
        })
    }, [ chatIDRef, deleteMutation, dest, ID ])

    const groupMessageDeleteHandler = useCallback(() => {
        const deleteMessage = deleteGroupMessageMutation[0];

        deleteMessage({ 
            variables: {
                groupID: chatIDRef.current,
                messageID: ID
            },
            onCompleted() {
                onCloseRef.current?.();
            },
            onError(error) {
                console.error(error)
            }
        });
    }, [ chatIDRef, deleteGroupMessageMutation, ID ])

    const destinatary = useMemo(() => {
        const result = getUsersList()?.find(item => item.username === sender);

        if(result) return result;
        return {};
    }, [ getUsersList, sender ]);
    

    const isReadIcon = (isLoggedUser) => {
        return isDirectChat ? <ReadIcon isDeleted={isDeleted} isLoggedUser={isLoggedUser} isRead={isRead}  /> : (
            <IsReadCard isDeleted={isDeleted} isLoggedUser={isLoggedUser} message={message} isRead={isRead} /> )
    };
    
    const myLoader = ({ src }) => getURL({ url: image });

    return (
        <article 
            className={classNames("flex mb-4 w-full", loggedUser.username === sender ? "justify-end" : "")}
            data-id={ID}>
            <div className={classNames("flex items-end")}>
                <Avatar destinatary={destinatary} isDirectChat={isDirectChat} sender={sender} />
                <div className={classNames("", { "ml-3": loggedUser.username !== sender})}>
                    { isForwarded && <Typography className="flex items-center text-xs text-slate-500">
                        <ShortcutIcon /> forwarded
                    </Typography> }
                    <div className={classNames("flex flex-col min-w-[120px] pt-1 pb-3 px-4 rounded-2xl", 
                        borderClasses,
                        isDeleted ? "deleted-message" : "")}>
                        <IconButton disabled={isDeleted} className="p-0 self-end" onClick={e => onClickRef.current?.(e)}>
                            <MoreHorizIcon />
                        </IconButton>
                        { reply !== null && <RepliedMessage { ...reply } /> }
                        { image && (
                            <div className="h-[100px] relative w-full">
                                <Image 
                                    alt={message.text}
                                    className="object-contain"
                                    loader={myLoader}
                                    layout="fill"
                                    src={getURL({ url: image })}
                                />
                            </div>
                        )}
                        <Typography>
                            { isDeleted ? "This message was deleted" : text }
                        </Typography>
                    </div>
                    { !isDeleted && <Typography className={classNames("mt-[4px] text-xs text-slate-500 dark:text-slate-300", loggedUser.username !== sender ? "" : "text-right")}>
                        { sender !== loggedUser.username && isReadIcon(false) }
                        { getDate(new Date(parseInt(createdAt))) } 
                        { sender === loggedUser.username && isReadIcon(true) }
                    </Typography> }
                </div>
                <Popover
                    id={ID}
                    onClickRef={onClickRef}
                    onCloseRef={onCloseRef}
                >
                    <List className={classNames("py-0 w-[170px]")}>
                        <ListItem 
                            disablePadding 
                            onClick={replyHandler} 
                            className={classNames("dark:bg-stone-500 dark:hover:bg-slate-400 dark:text-slate-400 dark:hover:text-stone-900")}>
                            <ListItemButton>
                                <ListItemText 
                                    primary="Reply" 
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem 
                            disablePadding 
                            onClick={forwardHandler} 
                            className={classNames("dark:bg-stone-500 dark:hover:bg-slate-400 dark:text-slate-400 dark:hover:text-stone-900")}>
                            <ListItemButton>
                                <ListItemText 
                                    primary="Forward" 
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem 
                            disablePadding 
                            onClick={ isDirectChat ? deleteHandler : groupMessageDeleteHandler} 
                            className={classNames("dark:bg-stone-500 dark:hover:bg-slate-400")}>
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