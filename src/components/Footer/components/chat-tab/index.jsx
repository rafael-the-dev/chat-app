import { useContext, useMemo } from "react"
import classNames from "classnames"
import { Badge, IconButton } from "@mui/material"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons'

import { LoginContext } from "src/context/LoginContext"
import { useDirectChatsQuery } from "src/hooks"


library.add(faComment);

const ChatTab = ({ clickHandler, tab }) => {
    const { user } = useContext(LoginContext)

    const { data } = useDirectChatsQuery({ loggedUser: user });

    const unreadMessagesLength = useMemo(() => {
        const hasData = Boolean(data);
        const hasUser = Boolean(user)
        if(hasData && hasUser) {
            const chats = [ ...data.directChats ];
            console.log(chats)
            return chats.reduce((prevChatValue, currentChat) => {
                return prevChatValue + currentChat.messages.reduce((prevValue, currentMessage) => {
                    if(currentMessage.sender !== user.username && !currentMessage.isRead) {
                        return prevValue + 1;
                    }
                    return prevValue;
                }, 0)
            }, 0)
        }
        return 0;
    }, [ data, user ])

    return (
        <IconButton onClick={clickHandler("chat")}>
            <Badge 
                badgeContent={unreadMessagesLength} 
                classes={{ badge: classNames("text-slate-100",  tab === "chat" ? "bg-cyan-500" : "bg-red-500" ) }}>
                <FontAwesomeIcon 
                    className={classNames("text-2xl", `${tab === "chat" ? "text-red-500" : "text-cyan-500" }`)} 
                    icon="fa-solid comment fa-comment" 
                />
            </Badge>
        </IconButton>
    );
};

export default ChatTab;