import { useCallback, useMemo, useState } from "react"
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from "@mui/material"
import classNames from "classnames"
import { useRouter } from "next/router"

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';

import LeaveGroupButton from "./components/leave-group"

//import { useContext } from "react";
//import { LoginContext } from "src/context";

const Menu = ({ groupID }) => {
    //const { loggedUser } = useContext(LoginContext)
    const router = useRouter();

    const [ anchorEl, setAnchorEl] = useState(null);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'group-menu-popover' : undefined;

    const leaveGroupButton = useMemo(() => (
        <LeaveGroupButton 
            closePopover={handleClose} 
            groupID={groupID} 
        />
    ), [ groupID, handleClose ])

    const groupDetailsHandler = useCallback(() => {
        const { asPath } = router;
        handleClose();
        router.push(`${asPath}&gd=${groupID.current}`)
    }, [ groupID, handleClose, router ]);

    return (
        <>
            <IconButton className="" onClick={handleClick}>
                <MoreVertIcon className="text-slate-100" />
            </IconButton>
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
                    onClick={groupDetailsHandler}>
                    <ListItemButton>
                        <ListItemText  
                            className=""
                            primary="Details" 
                        />
                    </ListItemButton>
                </ListItem>
                    { leaveGroupButton }
                </List>
            </Popover>
        </>
    );
};

export default Menu;