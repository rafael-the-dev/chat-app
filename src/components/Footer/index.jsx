import classNames from 'classnames'
import { Hidden, IconButton } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

import classes from './styles.module.css'
import { useRouter } from 'next/router'

import ChatTab from "./components/chat-tab"
import Avatar from "../logged-user-avatar"

const Footer = () => {
    const router = useRouter();
    const { pathname } = router;
    const { tab } = router.query;

    const isSettingPage = () => pathname === "/settings" || pathname === "/profile";

    const clickHandler = prop => () => router.push(`/${prop ? `?tab=${prop}` : "" }`);
    const settingHandler = () => router.push("/settings")

    const navigation = () => (
        <nav className={classNames(classes.navbar, `bg-white flex justify-between py-2 px-2 w-full
            md:flex-col  md:shadow-none`)}>
            <IconButton onClick={clickHandler()}>
                <HomeIcon className={classNames("text-3xl", `${tab === undefined && !isSettingPage() ? "text-red-500" : "text-cyan-500" }`)} />
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
            <IconButton onClick={settingHandler}>
                <SettingsIcon className={classNames("text-3xl", `${isSettingPage() ? "text-red-500" : "text-cyan-500" }`)} />
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
                    items-center left-0 top-0 md:pb-2 w-[60px]`)}>
                    { navigation() }
                    <Avatar />
                </aside>
            </Hidden>
        </>
    );
};

export default Footer;