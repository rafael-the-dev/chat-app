import { useContext, useEffect, useMemo, useState } from 'react'
import { useQuery, useLazyQuery, useSubscription } from "@apollo/client"
import { LoginContext } from "src/context/LoginContext"

import { GET_FRIENDSHIPS } from 'src/graphql/queries';
import { FRIENDSHIP_INVITATION_ACCEPTED } from 'src/graphql/subscriptions';

export const useFriendshipsQuery = (loggedUser) => {
    const { user } = useContext(LoginContext);
    const username = useMemo(() => loggedUser ? loggedUser.username : "", [ loggedUser ]);

    const subscription = useSubscription(FRIENDSHIP_INVITATION_ACCEPTED, { variables: { id: username }})
    const [ getFriendshipsList, { data, loading, error, subscribeToMore } ] = useLazyQuery(GET_FRIENDSHIPS)
    //const { subscribeToMore, ...result } = useQuery(GET_FRIENDSHIPS);

    //const [ data, setData ] = useState(null);
    //const [ loading, setLoading ] = useState(false);
    //const [ error, setError ] = useState(null);

    //console.log(result)

    useEffect(() => {
        if(Boolean(user)) {
            subscribeToMore({
                document: FRIENDSHIP_INVITATION_ACCEPTED,
                variables: { id: username },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || !Boolean(user)) return prev;

                    const friendshipStatus = subscriptionData.data.friendshipInvitationAccepted;
                    const friendships = [ ...prev.friendships ];

                    if(user.username === friendshipStatus.sender.username) friendships.push(friendshipStatus.receiver);
                    else friendships.push(friendshipStatus.sender);

                    return Object.assign({}, prev, {
                        friendships
                    });
                }
            });
        }
    }, [ user, subscribeToMore, username ]); 

    
  
    useEffect(() => {
        if(Boolean(user)) {
            //getFriendshipsList()
        }
    }, [ getFriendshipsList, user ]);
  
    return { data, loading, error };
};

export default useFriendshipsQuery;