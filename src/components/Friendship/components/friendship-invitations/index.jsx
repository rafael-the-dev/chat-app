import { useContext, useMemo } from 'react'
import classNames from "classnames"
import classes from "../styles/container.module.css"

import { AppContext, LoginContext } from "src/context";
import { FriendshipContext } from 'src/context/FriendshipContext';

import Card  from "../friendship-invitation-card"
import Empty from "src/components/empty"

const FriendshipInvitations = () => {
    const { loggedUser } = useContext(LoginContext);
    const { getFriendshipInvitationsList } = useContext(AppContext)
    const { filterOptions, searchFriendsFilter } = useContext(FriendshipContext);
    
    const invitationsList = useMemo(() => {
        return getFriendshipInvitationsList().filter(invitation => invitation.sender.username !== loggedUser.username);
    }, [ getFriendshipInvitationsList, loggedUser ])
        
    return (
        invitationsList.length > 1 ? (
        <ul 
            className={classNames(classes.container, "", 
            { 'hidden': searchFriendsFilter !== filterOptions.current.invitations },
            { 'sm:flex': searchFriendsFilter === filterOptions.current.invitations },
            "list-none overflow-y-auto px-5 mt-6 sm:flex-wrap sm:justify-between md:flex-col md:flex-nowrap md:justify-start")}>
            {
                invitationsList.map((item, index) => (
                    <Card key={item.ID} { ...item } />
                ))
            }
        </ul>) :
        <Empty 
            className={classNames(classes.emptyContainer, 
            { 'hidden': searchFriendsFilter !== filterOptions.current.invitations })} 
            message={<>There are no friendship<br/>invitations</>} 
        />
    );
};

export default FriendshipInvitations;