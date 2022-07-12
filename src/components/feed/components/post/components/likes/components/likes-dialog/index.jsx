import { useId, useRef } from "react";
import { Button, Hidden, List } from "@mui/material"
import classNames from "classnames"

import ListItem from "../list-item"
import Popover from "src/components/popover"

const LikesDialog = ({ className, likes, label }) => {
    const ID = useId();
    const onClickRef = useRef(null);

    if(likes.length === 0) return <></>;
    
    return (
        <>
            <Button 
                className={classNames("lowercase py-0 text-black text-sm text-transition hover:text-red-500 dark:text-zinc-400")}
                onClick={event => onClickRef.current?.(event)}>
                { label ? label : <><Hidden mdDown>others</Hidden><Hidden mdUp>{likes.length} likes</Hidden></> }
            </Button>
            <Popover id={`${ID}-posts`} onClickRef={onClickRef}>
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