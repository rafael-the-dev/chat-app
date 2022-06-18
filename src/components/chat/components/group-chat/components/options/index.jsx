import { useCallback, useMemo, useState } from "react"
import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover } from "@mui/material"
import classNames from "classnames"

import MoreVertIcon from '@mui/icons-material/MoreVert';

import LeaveGroupButton from "./components/leave-group"
import GroupDetails from "src/components/group-details"

const Menu = ({ group, groupID }) => {
    console.log("hello rafael tivane")
    const [ properties, setProperties ] = useState({ anchorEl: null, openGroupDetailsDrawer: false })
    const { anchorEl, openGroupDetailsDrawer } = properties;

    const handleClose = useCallback(() => {
        setProperties(props => ({ ...props, anchorEl: null }));
    }, []);

    const handleCloseDrawer = useCallback(() => {
        setProperties(props => ({ ...props, openGroupDetailsDrawer: false }));
    }, []);

    const handleClick = useCallback((event) => {
        setProperties(props => ({ ...props, anchorEl: event.currentTarget }));
    }, []);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'group-menu-popover' : undefined;
    console.log(openPopover, id)

    const leaveGroupButton = useMemo(() => (
        <LeaveGroupButton 
            closePopover={handleClose} 
            groupID={groupID} 
        />
    ), [ groupID, handleClose ])

    const groupDetailsHandler = useCallback(() => {
        setProperties(props => ({ ...props, anchorEl: null, openGroupDetailsDrawer: true }));
    }, [ ]);

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
            <GroupDetails close={handleCloseDrawer} group={group} openDrawer={openGroupDetailsDrawer} />
        </>
    );
};

export default Menu;