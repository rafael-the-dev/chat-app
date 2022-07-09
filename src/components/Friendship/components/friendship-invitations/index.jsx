import { useContext, useMemo } from 'react'
import classNames from "classnames"

import { AppContext, LoginContext } from "src/context";
import { FriendshipContext } from 'src/context/FriendshipContext';

import Card  from "../friendship-invitation-card"

const FriendshipInvitations = () => {
    const { loggedUser } = useContext(LoginContext);
    const { getFriendshipInvitationsList } = useContext(AppContext)
    const { filterOptions, searchFriendsFilter } = useContext(FriendshipContext);
    
    const invitationsList = useMemo(() => {
        return getFriendshipInvitationsList().filter(invitation => invitation.sender.username !== loggedUser.username);
    }, [ getFriendshipInvitationsList, loggedUser ])
        
    return (
        <ul 
            className={classNames("", 
            { 'hidden': searchFriendsFilter !== filterOptions.current.invitations },
            { 'sm:flex': searchFriendsFilter === filterOptions.current.invitations },
            "list-none px-5 mt-6 sm:flex-wrap sm:justify-between md:flex-col")}>
            {
                invitationsList.map((item, index) => (
                    <Card key={item.ID} { ...item } />
                ))
            }
        </ul>
    );
};

export default FriendshipInvitations;