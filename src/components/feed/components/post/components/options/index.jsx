import { useContext, useMemo, useRef } from "react";
import { IconButton, List } from "@mui/material"
import classNames from "classnames"

import { LoginContext } from "src/context"
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeletePost from "./components/delete-post"
import Popover from "src/components/popover"

const Options = ({ author, ID }) => {
    const { loggedUser } = useContext(LoginContext);
    const onClickRef = useRef(null);

    const deletePostListItem = useMemo(() => <DeletePost id={ID} />, [ ID ])

    return (
        <>
            {loggedUser.username === author ? (
                <IconButton 
                    className="dark:text-slate-400"
                    onClick={e => onClickRef.current?.(e)}>
                    <MoreVertIcon />
                </IconButton>
            ) : <></>}
            <Popover
                id={`${ID}-${author}-post`}
                onClickRef={onClickRef}
            >
                <List className={classNames("py-0 w-[230px] dark:bg-stone-900")}>
                    { deletePostListItem }
                </List>
            </Popover>
        </>
    );
};

export default Options;