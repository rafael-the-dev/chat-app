import { useCallback, useContext, useMemo } from "react"
import { Typography } from "@mui/material"
import classNames from "classnames";

import classes from "./styles.module.css"
import { AppContext, LoginContext } from "src/context"

import Card from "src/components/Friendship/components/user-card"

const KnownPeople = () => {
    const { getFriendshipsList, getFriendshipInvitationsList, getUsersList } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext)

    const isMyFriend = useCallback((username) => {
        if(username === loggedUser.username) return false;

        const hasUsername = getFriendshipsList().find(user => user.username === username);

        return !Boolean(hasUsername);
    }, [ getFriendshipsList, loggedUser ]);

    const hasInvitationSent = useCallback((username) => {
        return getFriendshipInvitationsList().find(invitation => {
            const filters = [ username, loggedUser.username ];
            return filters.includes(invitation.sender.username) && filters.includes(invitation.target.username);
        })
    }, [ getFriendshipInvitationsList, loggedUser ]);

    const isValid = useCallback(user => {
        const username = user.username;
        return !hasInvitationSent(username) && isMyFriend(username);
    }, [ hasInvitationSent, isMyFriend ])

    const list = useMemo(() => getUsersList().filter(isValid), [ getUsersList, isValid ]);
    console.log("list", list)

    return (
        <section className={classNames(classes.root, `bg-transition h-[300px] max-h-[330px] mb-6 pt-3 rounded-xl dark:bg-stone-500`)}>
            <Typography
                className="font-bold text-transition dark:text-slate-200"
                component="h2">
                People you may know
            </Typography>
            <ul className={classNames("")}>
                {
                    list.map(user => <Card key={user.username} { ...user } />)
                }
            </ul>
        </section>
    );
};

export default KnownPeople;