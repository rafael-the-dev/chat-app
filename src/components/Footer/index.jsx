import classNames from 'classnames'
import { IconButton, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './styles.module.css'

const Footer = () => {
    return (
        <footer className={classNames(`bottom-0 fixed w-full`)}>
            <nav className={classNames(classes.navbar, "bg-white flex justify-between py-2 px-2 w-full")}>
                <IconButton>
                    <HomeIcon className={classNames("text-3xl text-red-500")} />
                </IconButton>
                <IconButton>
                    <FontAwesomeIcon className={classNames("text-3xl text-cyan-500")} icon="fa-solid fa-comment" />
                </IconButton>
                <IconButton>
                    <PeopleAltIcon className={classNames("text-3xl text-cyan-500")} />
                </IconButton>
                <IconButton>
                    <NotificationsIcon className={classNames("text-3xl text-cyan-500")} />
                </IconButton>
                <IconButton>
                    <SettingsIcon className={classNames("text-3xl text-cyan-500")} />
                </IconButton>
            </nav>
        </footer>
    );
};

export default Footer;