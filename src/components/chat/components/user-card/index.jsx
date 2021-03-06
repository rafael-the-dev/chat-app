import { Typography } from "@mui/material"
import { useCallback, useContext, useMemo, useRef } from "react"
import classNames from 'classnames';

import classes from "./styles.module.css"
import { AppContext } from "src/context"

import CircleIcon from '@mui/icons-material/Circle';

import Avatar from "src/components/avatar"
import UserDetails from "../user-details"

const User = ({ username }) => {
    const { getUsersList } = useContext(AppContext);
    const clickHandler = useRef(null);

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
            className={classNames("flex items-centerv mb-3 w-full last:mb-0 hover:cursor-pointer")}
            onClick={openPopover}>
            <Avatar 
                className={classes.avatar}
                image={groupMember.image}
            />
            <Typography 
                className={classNames("font-semibold grow ml-3 max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap dark:text-slate-400")} 
                component="h2">
                { groupMember.name }
            </Typography>
            <CircleIcon className={classNames(classes.availabilityIcon, groupMember.isOnline ? "text-green-500" : "text-red-500")} />
            <UserDetails clickHandler={clickHandler} username={username} />
        </li>
    );
};

export default User;