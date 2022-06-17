import { Typography } from "@mui/material";
import { useId } from "react"
import classNames from "classnames"

import UserCard from "./components/user"
import classes from "./styles.module.css"

const Sidebar = ({ group }) => {
    const id = useId();

    console.log(group.members)

    return (
        <aside className={classNames(classes.sidebar, `px-3 pt-4`)}>
            <section className={classNames(classes.adminsSection, `border-b border-solid`)}>
                <Typography 
                    component="h2" 
                    className="font-bold text-xl">
                    Admins
                </Typography>
                <ul className="pt-3 pb-4">
                    <UserCard username={group.admin} />
                </ul>
            </section>
            <section className="pt-4">
                <Typography 
                    className="font-semibold"
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