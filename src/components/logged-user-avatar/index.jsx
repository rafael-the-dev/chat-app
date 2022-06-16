import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from "@mui/material"
import { useCallback, useState } from "react"
import classNames from "classnames";
import { useContext } from 'react';
import { AppContext, LoginContext } from 'src/context';

import LogoutIcon from '@mui/icons-material/Logout';

const UserAvatar = () => {
    const { logout, loggedUser } = useContext(LoginContext);
    const { getInitialsNameLetters, serverPublicURL } = useContext(AppContext)

    const [ anchorEl, setAnchorEl] = useState(null);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'group-menu-popover' : undefined;

    return (
        <div>
            <Avatar
                className={classNames({ "bg-cyan-500": !Boolean(loggedUser.image) })}
                src={`${serverPublicURL.current}/${loggedUser.image}`}
                onClick={handleClick}>
                { getInitialsNameLetters(loggedUser.name) }
            </Avatar>
            <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClose}
                classes={{ paper: ""}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List className={classNames("py-0 w-[200px]")}>
                    <ListItem 
                        disablePadding 
                        onClick={logout}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon className="text-red-500" />
                            </ListItemIcon>
                            <ListItemText  
                                className="text-red-500"
                                primary="Log out" 
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
};

export default UserAvatar;