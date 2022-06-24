import { useContext, useEffect, useMemo } from 'react'
import { useSubscription } from "@apollo/client"
import { LoginContext } from "src/context/LoginContext"

import { FRIENDSHIP_INVITATION_SENT } from 'src/graphql/subscriptions';

export const useFriendshipsInvitationsQuery = ({ subscribeToMore }) => {
    const { loggedUser, user } = useContext(LoginContext);
    const username = useMemo(() => loggedUser.username, [ loggedUser ]);

    const subscription = useSubscription(FRIENDSHIP_INVITATION_SENT, { variables: { id: username }})

    useEffect(() => {
        if(Boolean(user)) {
            subscribeToMore({
                document: FRIENDSHIP_INVITATION_SENT,
                variables: { id: username },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || !Boolean(user)) return prev;
                    
                    const invitation = subscriptionData.data.friendshipInvitationSent;
                    let friendshipInvitations = [ ...prev.loggedUser.friendshipInvitations.filter(item => item.sender.username !== invitation.sender.username) ];
                    
                    if(invitation.active) {
                        friendshipInvitations = [ invitation, ...friendshipInvitations ];
                    }
                    
                    return Object.assign({}, prev, {
                        loggedUser: { ...prev.loggedUser, friendshipInvitations }
                    });
                }
            });
        }
    }, [ user, subscribeToMore, username ]); 
  
};
