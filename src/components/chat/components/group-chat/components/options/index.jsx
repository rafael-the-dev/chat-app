import { useCallback, useMemo, useRef, useState } from "react"
import { IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import classNames from "classnames"

import MoreVertIcon from '@mui/icons-material/MoreVert';

import LeaveGroupButton from "./components/leave-group"
import GroupDetails from "src/components/group-details"
import Popover from "src/components/popover"

const Menu = ({ group, groupID }) => {
    const [ properties, setProperties ] = useState({ anchorEl: null, openGroupDetailsDrawer: false });
    const onClickRef = useRef(null);
    const onCloseRef = useRef(null);
    const { openGroupDetailsDrawer } = properties;

    const handleClose = useCallback(e => {
        //setProperties(props => ({ ...props, anchorEl: null }));
        onCloseRef.current?.(e);
    }, []);

    const handleCloseDrawer = useCallback(() => {
        setProperties(props => ({ ...props, openGroupDetailsDrawer: false }));
    }, []);

    const handleClick = useCallback((event) => {
        onClickRef.current?.(event);
        //setProperties(props => ({ ...props, anchorEl: event.currentTarget }));
    }, []);

    const leaveGroupButton = useMemo(() => (
        <LeaveGroupButton 
            closePopover={handleClose} 
            groupID={groupID} 
        />
    ), [ groupID, handleClose ])

    const groupDetailsHandler = useCallback(e => {
        handleClose(e);
        setProperties(props => ({ ...props, anchorEl: null, openGroupDetailsDrawer: true }));
    }, [ handleClose ]);

    return (
        <>
            <IconButton className="" onClick={handleClick}>
                <MoreVertIcon className="text-slate-100" />
            </IconButton>
            <Popover
                id={`${groupID}-group-menu`}
                onClickRef={onClickRef}
                onCloseRef={onCloseRef}
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