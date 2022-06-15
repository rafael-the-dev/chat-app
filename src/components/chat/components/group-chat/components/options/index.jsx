import { useCallback, useMemo, useState } from "react"
import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover } from "@mui/material"
import classNames from "classnames"
//import { useMutation } from "@apollo/client"

import MoreVertIcon from '@mui/icons-material/MoreVert';

import LeaveGroupButton from "./components/leave-group"

//import { useContext } from "react";
//import { LoginContext } from "src/context";

const Menu = ({ groupID }) => {
    //const { loggedUser } = useContext(LoginContext)

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
                    { leaveGroupButton }
                </List>
            </Popover>
        </>
    );
};

export default Menu;