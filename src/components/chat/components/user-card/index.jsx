import { Avatar, Typography } from "@mui/material"
import { useCallback, useContext, useMemo, useRef, useState } from "react"
import classNames from 'classnames';

import classes from "./styles.module.css"
import { AppContext } from "src/context"

import CircleIcon from '@mui/icons-material/Circle';

import UserDetails from "../user-details"

const User = ({ username }) => {
    const { getInitialsNameLetters, getUsersList } = useContext(AppContext);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const clickHandler = useRef(null);

    /*const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);*/
    //const clickHandler = useCallback(event => setAnchorEl(event.currentTarget), [])

    const groupMember = useMemo(() => {
        const result = getUsersList().find(user => user.username === username);
        if(result) return result;

        return { image: "", isOnline: "", name: "", username: "" }
    }, [ getUsersList, username ]);

    const openPopover = useCallback(event => {
        event.stopPropagation();
        if(clickHandler.current) {
            clickHandler.current(event);
        }
    }, [])

    return (
        <li 
            className={classNames("flex items-centerv mb-3 w-full last:mb-0")}
            onClick={openPopover}>
            <Avatar 
                className="h-[25px] text-base w-[25px]"
                src={groupMember.image ? `http://localhost:5000/${groupMember.image}` : ""}>
                { groupMember.image ? "" :getInitialsNameLetters(groupMember.name) }
            </Avatar>
            <Typography 
                className={classNames("font-semibold grow ml-3 max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                component="h2">
                { groupMember.name }
            </Typography>
            <CircleIcon className={classNames(classes.availabilityIcon, groupMember.isOnline ? "text-green-500" : "text-red-500")} />
            <UserDetails clickHandler={clickHandler} username={username} />
        </li>
    );
};

export default User;