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
import Link from "./components/link"


const Footer = () => {
    const router = useRouter();
    const { pathname } = router;
    const { tab } = router.query;

    const homeDarkBg = () => pathname === "/" ? "dark:bg-stone-500" : "dark:bg-stone-900";
    const isSettingPage = () => pathname === "/settings" || pathname === "/profile";


    const getClasses = isTrue => isTrue ? "text-red-500" : "text-cyan-500";

    const navigation = () => (
        <nav className={classNames(classes.navbar, `bg-white flex justify-between py-2 px-2 w-full
            md:flex-col  md:shadow-none bg-transition`, homeDarkBg())}>
            <Link href="/">
                <HomeIcon className={classNames("text-3xl", getClasses(pathname === '/' && !isSettingPage()))} />
            </Link>
            <Link href="friendships">
                <PeopleAltIcon 
                    className={classNames("text-3xl", getClasses(pathname === "/friendships"))} 
                />
            </Link>
            <ChatTab getClasses={getClasses} pathname={pathname} tab={pathname} />
            <Link href="notifications">
                <NotificationsIcon className={classNames("text-3xl", getClasses(tab === "/notifications"))} />
            </Link>
            <Link href="settings">
                <SettingsIcon className={classNames("text-3xl", getClasses(isSettingPage()))} />
            </Link>
        </nav>
    );

    return (
        <>
            <Hidden mdUp>
                <footer className={classNames(`bottom-0 fixed w-full bg-transition dark:bg-stone-900`)}>
                    { navigation() }
                </footer>
            </Hidden>
            <Hidden mdDown>
                <aside className={classNames(classes.aside, `bg-white fixed flex flex-col  h-full justify-between
                    items-center left-0 top-0 md:pb-2 w-[60px] bg-transition`, homeDarkBg())}>
                    { navigation() }
                    <Avatar />
                </aside>
            </Hidden>
        </>
    );
};

export default Footer;