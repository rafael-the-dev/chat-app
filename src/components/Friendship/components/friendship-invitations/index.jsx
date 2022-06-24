import { useContext, } from 'react'
import classNames from "classnames"

import { AppContext } from "src/context/AppContext";
import { FriendshipContext } from 'src/context/FriendshipContext';

import Card  from "../friendship-invitation-card"

const FriendshipInvitations = () => {
    const { getFriendshipInvitationsList } = useContext(AppContext)
    const { filterOptions, searchFriendsFilter } = useContext(FriendshipContext)
        
    return (
        <ul className={classNames("list-none px-5 mt-6", { 'hidden': searchFriendsFilter !== filterOptions.current.invitations })}>
            {
                getFriendshipInvitationsList().map((item, index) => (
                    <Card key={item.ID} { ...item } />
                ))
            }
        </ul>
    );
};

export default FriendshipInvitations;