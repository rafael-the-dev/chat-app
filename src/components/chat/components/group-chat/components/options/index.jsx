import { useCallback, useState } from "react"
import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover } from "@mui/material"
import classNames from "classnames"

import MoreVertIcon from '@mui/icons-material/MoreVert';

const Menu = () => {
    const [ anchorEl, setAnchorEl] = useState(null);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'group-menu-popover' : undefined;

    const leaveGroupHandler = useCallback(() => {}, []);

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
                        onClick={leaveGroupHandler} 
                        className={classNames()}>
                        <ListItemButton>
                            <ListItemText  
                                className="text-red-500"
                                primary="Leave group" 
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </>
    );
};

export default Menu;