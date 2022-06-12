import { useContext, useEffect, useMemo } from 'react'
import { useLazyQuery, useSubscription } from "@apollo/client"
import { LoginContext } from "src/context/LoginContext"

import { GET_FRIENDSHIPS_INVITATIONS } from 'src/graphql/queries';
import { FRIENDSHIP_INVITATION_SENT } from 'src/graphql/subscriptions';

export const useFriendshipsInvitationsQuery = (loggedUser) => {
    const { user } = useContext(LoginContext);
    const username = useMemo(() => loggedUser ? loggedUser.username : "", [ loggedUser ]);
    const subscription = useSubscription(FRIENDSHIP_INVITATION_SENT, { variables: { id: username }})
    
    const [ getFriendshipsInvitations, { data, loading, error, subscribeToMore } ]  = useLazyQuery(GET_FRIENDSHIPS_INVITATIONS);

    useEffect(() => {
        if(Boolean(user)) {
            subscribeToMore({
                document: FRIENDSHIP_INVITATION_SENT,
                variables: { id: username },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || !Boolean(user)) return prev;

                    const invitation = subscriptionData.data.friendshipInvitationSent;
                    let friendshipInvitations = [ invitation, ...prev.friendshipInvitations.filter(item => item.sender.username !== invitation.sender.username) ];
                    
                    return Object.assign({}, prev, {
                        friendshipInvitations
                    });
                }
            });
        }
    }, [ user, subscribeToMore, username ]); 
  
    useEffect(() => {
        if(user) {
            getFriendshipsInvitations()//setData(result.data);
        }
    }, [ getFriendshipsInvitations, user ]);
  
    return { data, loading, error };
};
