import { Typography } from "@mui/material"
import { useContext, useId } from "react"
import classNames from "classnames"

import classes from './styles.module.css'

import { AppContext } from "src/context"
import UserCard from "src/components/chat/components/user-card"

const Sidebar = () => {
    const { getFriendshipsList } = useContext(AppContext);
    const id = useId();

    return (
        <aside className={classNames(classes.sidebar, `h-full px-3 pt-4 pb-32 overflow-y-auto dark:bg-stone-500`)}>
            <section>
                <Typography 
                    component="h2" 
                    className="font-bold text-xl">
                    Friends
                </Typography>
                <ul className="pt-4">
                    {
                        getFriendshipsList().map(user => (
                            <UserCard key={`${id}-${user.username}`} username={user.username} />
                        ))
                    }
                </ul>
            </section>
        </aside>
    );
};

export default Sidebar;