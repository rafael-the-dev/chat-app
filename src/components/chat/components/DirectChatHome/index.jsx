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
        <div className={classNames({ "hidden": chatTab !== "DIRECT_CHAT" })}>
            <ul className={classNames("list-none pt-4")}>
                {
                    directChats.map((item, index) => <MessageCard key={index} { ...item } />)
                }
            </ul>
            <Link href="/?tab=friends&amp;redirect=friends">
                <a className="bottom-[5rem] fixed right-3 z-10 md:absolute md:bottom-8 md:right-4">
                    <IconButton className="bg-cyan-700 text-slate-100 z-10 
                    hover:bg-red-500 hover:text-slate-300">
                        <MessageIcon className="text" />
                    </IconButton>
                </a>
            </Link>
        </div>
    );
};

export default  DirectChatHome;