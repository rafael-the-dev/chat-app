import { useCallback, useContext, useMemo } from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import Head from 'next/head';
import classNames from "classnames"
import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from 'src/context/AppContext';
import { ChatContext } from 'src/context';

import DirectChatsHome from "../DirectChatHome"
import GroupChat from "../group-chat-home"

const Home = () => {
    const { user } = useContext(LoginContext)
    const { getInitialsNameLetters, serverPublicURL } = useContext(AppContext)
    const { chatTab, setChatTab } = useContext(ChatContext)


    const clickHandler = useCallback(prop => () => setChatTab(prop), [ setChatTab ]);

    const classesToggler = useCallback((key, tab) => {
        return `py-2 rounded-none w-1/2 ${tab === key ? "bg-gray-500" : "bg-gray-400 text-black"}`
    }, [ ]);

    const directChatsMemo = useMemo(() => <DirectChatsHome />, []);
    const groupChatMemo = useMemo(() => <GroupChat />, [])

    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <header className="bg-cyan-700 flex items-center justify-between px-5 py-2">
                <Typography
                    className="font-bold text-slate-100 text-2xl uppercase" 
                    component="h1">
                    Chat app
                </Typography>
                <Avatar 
                    className={classNames({ "bg-cyan-500": !Boolean(user?.image) })}
                    src={user?.image ? `${serverPublicURL.current}/${user.image}` : ""}>
                    { user?.image ? "" : getInitialsNameLetters(user ? user.name : "" ) }
                </Avatar>
            </header>
            <main>
                <div className={classNames("flex pla")}>
                    <Button 
                        className={classNames(classesToggler("DIRECT_CHAT", chatTab))}
                        onClick={clickHandler("DIRECT_CHAT")}>
                        Direct chat
                    </Button>
                    <Button 
                        className={classNames(classesToggler("GROUP_CHAT", chatTab))}
                        onClick={clickHandler("GROUP_CHAT")}>
                        Group chat
                    </Button>
                </div>
                { directChatsMemo }
                { groupChatMemo }
            </main>
        </>
    );
};

export default Home;