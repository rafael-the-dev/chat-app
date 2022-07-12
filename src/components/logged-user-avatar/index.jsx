import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useRef } from "react"
import classNames from "classnames";
import { useContext } from 'react';
import { AppContext, LoginContext } from 'src/context';

import LogoutIcon from '@mui/icons-material/Logout';

import Popover from "src/components/popover"

const UserAvatar = () => {
    const { logout, loggedUser } = useContext(LoginContext);
    const { getInitialsNameLetters, serverPublicURL } = useContext(AppContext);

    const onClickRef = useRef(null);

    return (
        <div>
            <Avatar
                className={classNames({ "bg-cyan-500": !Boolean(loggedUser.image) })}
                src={`${serverPublicURL.current}/${loggedUser.image}`}
                onClick={e => onClickRef.current?.(e)}>
                { getInitialsNameLetters(loggedUser.name) }
            </Avatar>
            <Popover
                id={`${loggedUser.username}-logged-user`}
                onClickRef={onClickRef}
            >
                <List className={classNames("py-0 w-[200px]")}>
                    <ListItem 
                        disablePadding 
                        onClick={logout}>
                        <ListItemButton className="dark:bg-stone-900 dark:hover:bg-stone-500">
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