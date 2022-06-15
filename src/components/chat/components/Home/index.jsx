import { useCallback, useContext, useEffect, useMemo } from 'react'
import { Avatar, Button, Hidden, Typography } from '@mui/material'
import { useRouter } from "next/router"
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

    const router = useRouter();
    const { subtab } = router.query;

    const clickHandler = useCallback(prop => () => setChatTab(prop), [ setChatTab ]);

    const classesToggler = useCallback((key, tab) => {
        return `py-2 rounded-none w-1/2 ${tab === key ? "bg-gray-500" : "bg-gray-400 text-black"}`
    }, [ ]);

    const directChatsMemo = useMemo(() => <DirectChatsHome />, []);
    const groupChatMemo = useMemo(() => <GroupChat />, []);

    useEffect(() => {
        switch(subtab) {
            case "direct-chat": {
                setChatTab("DIRECT_CHAT")
                return;
            }
            case "group-chat": {
                setChatTab("GROUP_CHAT")
                return;
            }
            default: {
                return;
            }
        }
    }, [ subtab, setChatTab ])

    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <Hidden mdUp>
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
            </Hidden>
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