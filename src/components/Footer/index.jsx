import classNames from 'classnames'
import { Avatar, Hidden, IconButton } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

import classes from './styles.module.css'
import { useRouter } from 'next/router'

import ChatTab from "./components/chat-tab"
import { useContext } from 'react';
import { AppContext, LoginContext } from 'src/context';

const Footer = () => {
    const router = useRouter();
    const { pathname } = router;
    const { tab } = router.query;

    const { user } = useContext(LoginContext);
    const { getInitialsNameLetters, serverPublicURL } = useContext(AppContext)

    const clickHandler = prop => () => router.push(`${pathname}${prop ? `?tab=${prop}` : "" }`);

    const navigation = () => (
        <nav className={classNames(classes.navbar, `bg-white flex justify-between py-2 px-2 w-full
            md:flex-col  md:shadow-none`)}>
            <IconButton onClick={clickHandler()}>
                <HomeIcon className={classNames("text-3xl", `${tab === undefined ? "text-red-500" : "text-cyan-500" }`)} />
            </IconButton>
            <IconButton onClick={clickHandler("friends")}>
                <PeopleAltIcon 
                    className={classNames("text-3xl", `${tab === "friends" ? "text-red-500" : "text-cyan-500" }`)} 
                />
            </IconButton>
            <ChatTab clickHandler={clickHandler} tab={tab} />
            <IconButton onClick={clickHandler("notifications")}>
                <NotificationsIcon className={classNames("text-3xl", `${tab === "notifications" ? "text-red-500" : "text-cyan-500" }`)} />
            </IconButton>
            <IconButton onClick={clickHandler("settings")}>
                <SettingsIcon className={classNames("text-3xl", `${tab === "settings" ? "text-red-500" : "text-cyan-500" }`)} />
            </IconButton>
        </nav>
    );

    return (
        <>
            <Hidden mdUp>
                <footer className={classNames(`bottom-0 fixed w-full`)}>
                    { navigation() }
                </footer>
            </Hidden>
            <Hidden mdDown>
                <aside className={classNames(classes.aside, `bg-white fixed flex flex-col  h-full justify-between
                    items-center left-0 top-0 md:pb-2 w-[50px]`)}>
                    { navigation() }
                    <Hidden>
                        <Avatar
                            className={classNames({ "bg-cyan-500": !Boolean(user?.image) })}
                            src={user?.image ? `${serverPublicURL.current}/${user.image}` : ""}>
                            { user?.image ? "" : getInitialsNameLetters(user ? user.name : "" ) }
                        </Avatar>
                    </Hidden>
                </aside>
            </Hidden>
        </>
    );
};

export default Footer;