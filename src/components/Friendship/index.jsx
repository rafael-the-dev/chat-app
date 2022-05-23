import { useCallback, useContext, useMemo, useState } from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import Head from 'next/head';
import classNames from "classnames"
import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from "src/context/AppContext";

import SearchFriendsContainer from "./components/search-friends"
import FriendshipContainer from "./components/friendships"

const Container = () => {
    const { user } = useContext(LoginContext)
    const { getUsersList, getInitialsNameLetters, serverPublicURL } = useContext(AppContext)
    const [ tab, setTab ] = useState("SEARCH_FRIENDS");

    const clickHandler = useCallback(prop => () => setTab(prop), []);

    const friendsContainer = useMemo(() => <FriendshipContainer />, []);
    const searchFriendsContainer = useMemo(() => <SearchFriendsContainer />, []);

    const classesToggler = useCallback((key, tab) => {
        return `py-2 rounded-none w-1/2 ${tab === key ? "bg-gray-500" : "bg-gray-400 text-black"}`
    }, [ ]);

    return (
        <>
            <Head>
                <title>Friends</title>
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
                        className={classNames(classesToggler("SEARCH_FRIENDS", tab))}
                        onClick={clickHandler("SEARCH_FRIENDS")}>
                        Search friends
                    </Button>
                    <Button 
                        className={classNames(classesToggler("FRIENDS", tab))}
                        onClick={clickHandler("FRIENDS")}>
                        Friends
                    </Button>
                </div>
                <div  className={classNames({ 'hidden': tab !== 'SEARCH_FRIENDS' })}>
                    { searchFriendsContainer }
                </div>
                <div className={classNames("mt-4 px-5", { 'hidden': tab !== 'FRIENDS' })}>
                    { friendsContainer }
                </div>
            </main>
        </>
    );
};

export default Container;