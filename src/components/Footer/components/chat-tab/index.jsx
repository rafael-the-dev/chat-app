import { useContext, useMemo } from "react"
import classNames from "classnames"
import { Badge, IconButton } from "@mui/material"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons'

import { LoginContext } from "src/context/LoginContext"
import { AppContext } from "src/context/AppContext"

import Link from "../link"

library.add(faComment);

const ChatTab = ({ getClasses, pathname, tab }) => {
    const { loggedUser } = useContext(LoginContext)
    const { getDirectChats } = useContext(AppContext)

    const unreadMessagesLength = useMemo(() => {
        if(getDirectChats()) {
            const chats = [ ...getDirectChats() ];
            console.log(chats)
            return chats.reduce((prevChatValue, currentChat) => {
                return prevChatValue + currentChat.messages.reduce((prevValue, currentMessage) => {
                    if(currentMessage.sender !== loggedUser.username && !currentMessage.isRead) {
                        return prevValue + 1;
                    }
                    return prevValue;
                }, 0)
            }, 0)
        }
        return 0;
    }, [ getDirectChats, loggedUser ])

    return (
        <Link href="chat">
            <Badge 
                badgeContent={unreadMessagesLength} 
                classes={{ badge: classNames("text-slate-100",  tab === "chat" ? "bg-cyan-500" : "bg-red-500" ) }}>
                <FontAwesomeIcon 
                    className={classNames("text-2xl", getClasses(pathname === "/chat"))} 
                    icon="fa-solid comment fa-comment" 
                />
            </Badge>
        </Link>
    );
};

export default ChatTab;