import { useEffect, useMemo, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"

import { GET_FRIENDSHIPS_INVITATIONS } from 'src/graphql/queries';
import { FRIENDSHIP_INVITATION_SENT } from 'src/graphql/subscriptions';

export const useFriendshipsInvitationsQuery = (loggedUser) => {
    const username = useMemo(() => loggedUser ? loggedUser.username : "", [ loggedUser ]);
    const subscription = useSubscription(FRIENDSHIP_INVITATION_SENT, { variables: { id: username }})
    
    const { subscribeToMore, ...result } = useQuery(GET_FRIENDSHIPS_INVITATIONS);

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        subscribeToMore({
            document: FRIENDSHIP_INVITATION_SENT,
            variables: { id: username },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !Boolean(loggedUser)) return prev;

                const invitation = subscriptionData.data.friendshipInvitationSent;
                let friendshipInvitations = [ invitation, ...prev.friendshipInvitations.filter(item => item.sender.username !== invitation.sender.username) ];
                
                return Object.assign({}, prev, {
                    friendshipInvitations
                });
            }
        });
    }, [ loggedUser, subscribeToMore, username ]); 
  
    useEffect(() => {
        if(result.data) {
            setData(result.data);
        }
    }, [ result ]);
  
    return { data, loading, error };
};
