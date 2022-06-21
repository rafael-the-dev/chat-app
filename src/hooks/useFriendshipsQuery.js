import { useContext, useEffect, useMemo } from 'react'
import { useLazyQuery, useSubscription } from "@apollo/client"
import { LoginContext } from "src/context/LoginContext"

import { GET_FRIENDSHIPS } from 'src/graphql/queries';
import { FRIENDSHIP_INVITATION_ACCEPTED } from 'src/graphql/subscriptions';

export const useFriendshipsQuery = ({ subscribeToMore }) => {
    const { loggedUser, user } = useContext(LoginContext);
    const username = useMemo(() => loggedUser ? loggedUser.username : "", [ loggedUser ]);

    const subscription = useSubscription(FRIENDSHIP_INVITATION_ACCEPTED, { variables: { id: username }})
    //const [ getFriendshipsList, { data, loading, error, subscribeToMore } ] = useLazyQuery(GET_FRIENDSHIPS)

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
                    console.log(prev)
                    console.log(friendships)
                    return Object.assign({}, prev, {
                        friendships
                    });
                }
            });
        }
    }, [ user, subscribeToMore, username ]); 
  
    //return { data, loading, error };
};

export default useFriendshipsQuery;