import { useCallback, useState } from "react"
import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import { useMutation } from "@apollo/client"

import CircularProgress from '@mui/material/CircularProgress';

import { LEAVE_GROUP } from "src/graphql/mutations"
import { useContext } from "react";
import { LoginContext } from "src/context";

const LeaveGroup = ({ closePopover, groupID }) => {
    const { loggedUser } = useContext(LoginContext)
    const leaveGroupMutation = useMutation(LEAVE_GROUP);

    const [ isLoading, setIsLoading ] = useState(false);

    const leaveGroupHandler = useCallback(() => {
        const leaveGroup = leaveGroupMutation[0];
        setIsLoading(true)

        leaveGroup({ 
            variables: {
                groupID: groupID.current,
                isRemoved: false,
                removedUser: loggedUser.username
            },
            onCompleted() {
                closePopover()
            },
            onError(error) {
                console.error(error)
                closePopover()
            }
        })
    }, [ closePopover, groupID, leaveGroupMutation, loggedUser ]);

    return (
        <ListItem 
            disablePadding 
            onClick={leaveGroupHandler}>
            <ListItemButton disabled={isLoading}>
                { isLoading && (
                    <ListItemIcon>
                        <CircularProgress className="text-red-500" size={25} />
                    </ListItemIcon>
                )}
                <ListItemText  
                    className="text-red-500"
                    primary="Leave group" 
                />
            </ListItemButton>
        </ListItem>
    );
};

export default LeaveGroup;