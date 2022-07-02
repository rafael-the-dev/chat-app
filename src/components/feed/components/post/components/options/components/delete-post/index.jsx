import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useCallback, useState } from "react";
import classNames from 'classnames'
import { useMutation } from "@apollo/client"

import CircularProgress from '@mui/material/CircularProgress';

import { DELETE_POST } from "src/graphql/mutations"

const DeletePost = ({ id }) => {
    const deleteMutation = useMutation(DELETE_POST);
    const [ isLoading, setIsLoading ] = useState(false);

    const clickHandler  = useCallback(() => {
        setIsLoading(true);
        
        const deletePost = deleteMutation[0];

        deletePost({
            variables: {
                id
            },
            onCompleted() {
                setIsLoading(false);
            },
            onError(error) {
                console.log(error);
                setIsLoading(false);
            }
        })
    }, [ deleteMutation, id ]);

    return (
        <ListItem 
            disablePadding 
            onClick={clickHandler} 
            className={classNames("dark:hover:bg-stone-500")}>
            <ListItemButton disabled={isLoading}>
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

export default DeletePost;