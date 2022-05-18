import classNames from 'classnames'
import { IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './styles.module.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
library.add(faComment);

const Footer = () => {
    const router = useRouter();
    const { pathname } = router;
    const { tab } = router.query;

    const clickHandler = prop => () => router.push(`${pathname}${prop ? `?tab=${prop}` : "" }`);

    return (
        <footer className={classNames(`bottom-0 fixed w-full`)}>
            <nav className={classNames(classes.navbar, "bg-white flex justify-between py-2 px-2 w-full")}>
                <IconButton onClick={clickHandler()}>
                    <HomeIcon className={classNames("text-3xl", `${tab === undefined ? "text-red-500" : "text-cyan-500" }`)} />
                </IconButton>
                <IconButton onClick={clickHandler("friends")}>
                    <PeopleAltIcon 
                        className={classNames("text-3xl", `${tab === "friends" ? "text-red-500" : "text-cyan-500" }`)} 
                    />
                </IconButton>
                <IconButton onClick={clickHandler("chat")}>
                    <FontAwesomeIcon 
                        className={classNames("text-2xl", `${tab === "chat" ? "text-red-500" : "text-cyan-500" }`)} 
                        icon="fa-solid comment fa-comment" 
                    />
                </IconButton>
                <IconButton onClick={clickHandler("notifications")}>
                    <NotificationsIcon className={classNames("text-3xl", `${tab === "notifications" ? "text-red-500" : "text-cyan-500" }`)} />
                </IconButton>
                <IconButton onClick={clickHandler("settings")}>
                    <SettingsIcon className={classNames("text-3xl", `${tab === "settings" ? "text-red-500" : "text-cyan-500" }`)} />
                </IconButton>
            </nav>
        </footer>
    );
};

export default Footer;