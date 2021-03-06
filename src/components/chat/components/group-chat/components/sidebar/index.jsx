import { Typography } from "@mui/material";
import { useId } from "react"
import classNames from "classnames"

import UserCard from "src/components/chat/components/user-card"
import classes from "./styles.module.css"

const Sidebar = ({ group }) => {
    const id = useId();

    return (
        <aside className={classNames(classes.sidebar, `h-full px-3 pt-4 pb-32 overflow-y-auto  dark:bg-stone-500`)}>
            <section className={classNames(classes.adminsSection, `border-b border-solid`)}>
                <Typography 
                    component="h2" 
                    className="font-bold text-xl dark:text-slate-300">
                    Admins
                </Typography>
                <ul className="pt-3 pb-4">
                    <UserCard username={group.admin} />
                </ul>
            </section>
            <section className="pt-4">
                <Typography 
                    className="font-semibold dark:text-slate-400"
                    component="h2">
                    Others
                </Typography>
                <ul className="mt-3">
                    {
                        group.members
                            .filter(member => member !== group.admin)
                            .map(member => (
                                <UserCard key={`${id}-${member}`} username={member} />
                            ))
                    }
                </ul>
            </section>
        </aside>
    );
};

export default Sidebar;