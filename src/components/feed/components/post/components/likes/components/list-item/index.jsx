import { Avatar, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useContext, useMemo } from "react"
import classNames from "classnames"
import Link from "next/link"

import { AppContext, LoginContext } from "src/context"

const ListItemContainer = ({ username }) => {
    const { loggedUser } = useContext(LoginContext)
    const { getUsersList, serverPublicURL } = useContext(AppContext);

    const details = useMemo(() => {
        const result = getUsersList().find(user => user.username === username);

        if(result) return result;

        return { image: "", name: "", username: "" }
    }, [ getUsersList, username ]);

    return (
        <ListItem 
            disablePadding 
            className={classNames("dark:hover:bg-stone-500 dark:text-slate-400")}>
            <Link href={`profile?username=${details.username}`}>
                <a className="flex items-center px-3 py-2 text-black hover:bg-slate-200 w-full">
                    <Avatar 
                        alt={details.name} 
                        className="h-[30px] w-[30px]"
                        src={`${serverPublicURL.current}/${details.image}`} 
                    />
                    <ListItemText 
                        className="ml-2"
                        primary={ details.username === loggedUser.username ? "You" : details.username } 
                    />
                </a>
            </Link>
        </ListItem>
    );
};

export default ListItemContainer;