import { useContext, useMemo } from "react"
import { AppContext } from "src/context/AppContext";
import { ChatContext } from "src/context"
import classNames from 'classnames'

import Link from "next/link"

import { IconButton } from "@mui/material"

import MessageIcon from '@mui/icons-material/Message';

//import { LoginContext } from "src/context/LoginContext"
//import { useDirectChatsQuery } from "src/hooks"

import MessageCard from "./components/message-card"

const DirectChatHome = () => {
    const { getDirectChats } = useContext(AppContext);
    const { chatTab,  } = useContext(ChatContext);

    const directChats = useMemo(() => {
        if(getDirectChats()) {
            const chats = [ ...getDirectChats() ];

            const sortedData = chats.sort((a, b) => {
                const aDate = new Date(parseInt(a.messages[a.messages.length - 1].createdAt));
                const bDate = new Date(parseInt(b.messages[b.messages.length - 1].createdAt));

                return bDate - aDate;
            });

            return sortedData;
        }
        return [];
    }, [ getDirectChats ])
    
    return (
        <div className={classNames("pt-4", { "hidden": chatTab !== "DIRECT_CHAT" })}>
            {
                directChats.map((item, index) => <MessageCard key={index} { ...item } />)
            }
            <Link href="/?tab=friends&amp;redirect=friends">
                <a>
                    <IconButton className="bg-cyan-700 bottom-[5rem] fixed right-3 text-slate-100 z-10 
                    hover:bg-red-500 hover:text-slate-300">
                        <MessageIcon className="text" />
                    </IconButton>
                </a>
            </Link>
        </div>
    );
};

export default  DirectChatHome;