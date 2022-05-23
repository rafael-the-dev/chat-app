import { useEffect, useMemo, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"


import { GET_FRIENDSHIPS } from 'src/graphql/queries';
import { FRIENDSHIP_INVITATION_ACCEPTED } from 'src/graphql/subscriptions';

export const useFriendshipsQuery = (loggedUser) => {
    const username = useMemo(() => loggedUser ? loggedUser.username : "", [ loggedUser ]);

    const subscription = useSubscription(FRIENDSHIP_INVITATION_ACCEPTED, { variables: { id: username }})
    const { subscribeToMore, ...result } = useQuery(GET_FRIENDSHIPS);

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        subscribeToMore({
            document: FRIENDSHIP_INVITATION_ACCEPTED,
            variables: { id: username },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !Boolean(loggedUser)) return prev;

                const friendshipStatus = subscriptionData.data.friendshipInvitationAccepted;
                const friendships = [ ...prev.friendships ];

                if(loggedUser.username === friendshipStatus.sender.username) friendships.push(friendshipStatus.receiver);
                else friendships.push(friendshipStatus.sender);

                return Object.assign({}, prev, {
                    friendships
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

export default useFriendshipsQuery;