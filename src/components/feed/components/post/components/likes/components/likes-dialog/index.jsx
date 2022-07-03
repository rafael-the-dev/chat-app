import { useCallback, useId, useState } from "react";
import { Button, List, Popover } from "@mui/material"
import classNames from "classnames"

import ListItem from "../list-item"

const LikesDialog = ({ likes }) => {
    const [ anchorEl, setAnchorEl] = useState(null);
    const ID = useId();

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? `${ID}-post-popover` : undefined;

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);
    
    return (
        <>
            <Button 
                className="lowercase py-0 text-black"
                onClick={handleClick}>
                others
            </Button>
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
                <List className={classNames("py-0 w-[230px] dark:bg-stone-900")}>
                    {
                        likes.map(like => <ListItem key={`${ID}-${like.username}`} { ...like } />)
                    }
                </List>
            </Popover>
        </>
    );
};

export default LikesDialog ;