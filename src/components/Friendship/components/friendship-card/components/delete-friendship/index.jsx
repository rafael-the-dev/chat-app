import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useCallback, useState } from "react";
import classNames from 'classnames'
import { useMutation } from "@apollo/client"

import CircularProgress from '@mui/material/CircularProgress';

import { DELETE_FRIENDSHIP } from "src/graphql/mutations"

const DeleteFriendshipListItem = ({ username }) => {
    const deleteMutation = useMutation(DELETE_FRIENDSHIP);
    const [ isLoading, setIsLoading ] = useState(false);

    const clickHandler  = useCallback(() => {
        setIsLoading(true);
        
        const deleteFriendship = deleteMutation[0];

        deleteFriendship({
            variables: {
                username
            },
            onCompleted() {
                setIsLoading(false);
            },
            onError(error) {
                console.error(error);
                setIsLoading(false);
            }
        })
    }, [ deleteMutation, username ]);

    return (
        <ListItem 
            disablePadding 
            onClick={clickHandler} 
            className={classNames("dark:hover:bg-stone-500")}>
            <ListItemButton>
                { isLoading && (
                    <ListItemIcon>
                        <CircularProgress className="text-red-500" size={25} />
                    </ListItemIcon>
                )}
                <ListItemText 
                    className={classNames('text-red-500')} 
                    primary="Delete" 
                />
            </ListItemButton>
        </ListItem>
    );
};

export default DeleteFriendshipListItem;