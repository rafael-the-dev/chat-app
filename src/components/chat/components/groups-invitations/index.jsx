import { Avatar, IconButton, Typography } from "@mui/material"
import classNames from "classnames"
import { useContext } from "react"

import { AppContext } from "src/context"
import Card from "./components/group-invitation-card"

const GroupsInvitations = () => {
    const { getGroupsInvitations } = useContext(AppContext);

    return (
        <div>
            <ul className="pt-3 pb-4 px-5">
                {
                    getGroupsInvitations().map(group => (
                        <Card key={group.ID} { ...group } />
                    ))
                }
            </ul>
        </div>
    );
};

export default GroupsInvitations;