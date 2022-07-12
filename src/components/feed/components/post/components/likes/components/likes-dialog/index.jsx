import { useCallback, useId, useState } from "react";
import { Button, Hidden, List, Popover } from "@mui/material"
import classNames from "classnames"

import ListItem from "../list-item"

const LikesDialog = ({ className, likes, label }) => {
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

    if(likes.length === 0) return <></>;
    
    return (
        <>
            <Button 
                className={classNames("lowercase py-0 text-black text-sm text-transition hover:text-red-500 dark:text-zinc-400")}
                onClick={handleClick}>
                { label ? label : <><Hidden mdDown>others</Hidden><Hidden mdUp>{likes.length} likes</Hidden></> }
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