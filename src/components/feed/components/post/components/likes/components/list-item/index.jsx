import { ListItem, ListItemText } from "@mui/material"
import { useContext, useMemo } from "react"
import classNames from "classnames"
import Link from "next/link"

import classes from "./styles.module.css"
import Avatar from "src/components/avatar"

import { AppContext, LoginContext } from "src/context"
import { getUserDetails } from "src/helpers/user"

const ListItemContainer = ({ username }) => {
    const { loggedUser } = useContext(LoginContext)
    const { getUsersList } = useContext(AppContext);

    const details = useMemo(() => getUserDetails({ list: getUsersList(), username }), [ getUsersList, username ]);

    return (
        <ListItem 
            disablePadding 
            className={classNames("dark:hover:bg-stone-500 dark:text-slate-400")}>
            <Link href={`profile?username=${details.username}`}>
                <a 
                    className="flex items-center px-3 py-2 text-black hover:bg-slate-200 w-full 
                    dark:text-slate-400 dark:hover:text-black">
                    <Avatar 
                        alt={details.name} 
                        className={classes.avatar}
                        image={details.image} 
                    />
                    <ListItemText 
                        className="ml-2"
                        classes={{ primary: classNames(classes.name, "overflow-hidden text-ellipsis whitespace-nowrap")}}
                        primary={ details.username === loggedUser.username ? "You" : details.username } 
                    />
                </a>
            </Link>
        </ListItem>
    );
};

export default ListItemContainer;