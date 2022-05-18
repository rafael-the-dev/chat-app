import classNames from 'classnames'
import { IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return (
        <footer className={classNames(`bottom-0 fixed flex justify-between w-full`)}>
            <nav>
                <IconButton>
                    <HomeIcon />
                </IconButton>
                <IconButton>
                    <FontAwesomeIcon icon="fa-solid fa-comment" />
                </IconButton>
                <IconButton>
                    <PeopleAltIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </nav>
        </footer>
    );
};

export default Footer;