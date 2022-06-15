import { useCallback, useState } from "react"
import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover } from "@mui/material"
import classNames from "classnames"
import { useMutation } from "@apollo/client"

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { LEAVE_GROUP } from "src/graphql/mutations"
import { useContext } from "react";
import { LoginContext } from "src/context";

const Menu = ({ groupID }) => {
    const { loggedUser } = useContext(LoginContext)
    const leaveGroupMutation = useMutation(LEAVE_GROUP);

    const [ anchorEl, setAnchorEl] = useState(null);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'group-menu-popover' : undefined;

    const leaveGroupHandler = useCallback(() => {
        const leaveGroup = leaveGroupMutation[0];

        leaveGroup({ 
            variables: {
                groupID: groupID.current,
                isRemoved: false,
                removedUser: loggedUser.username
            },
            onError(error) {
                console.error(error)
            }
        })
    }, [ groupID, leaveGroupMutation, loggedUser ]);

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