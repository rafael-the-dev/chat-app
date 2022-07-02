import { useCallback, useContext, useMemo, useState } from "react";
import { IconButton, List, Popover } from "@mui/material"
import classNames from "classnames"

import { LoginContext } from "src/context"
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeletePost from "./components/delete-post"

const Options = ({ author, ID }) => {
    const { loggedUser } = useContext(LoginContext);
    const [ anchorEl, setAnchorEl] = useState(null);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? `${ID}-post-popover` : undefined;

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const deletePostListItem = useMemo(() => <DeletePost id={ID} />, [ ID ])

    return (
        <>
            {loggedUser.username === author ? (
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
            ) : <></>}
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
                    { deletePostListItem }
                </List>
            </Popover>
        </>
    );
};

export default Options;