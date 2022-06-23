import { useContext, useEffect, useMemo } from 'react'
import { useSubscription } from "@apollo/client"
import { LoginContext } from "src/context/LoginContext"

import { FRIENDSHIP_INVITATION_ACCEPTED } from 'src/graphql/subscriptions';

export const useFriendshipsQuery = ({ subscribeToMore }) => {
    const { loggedUser, user } = useContext(LoginContext);
    const username = useMemo(() => loggedUser.username, [ loggedUser ]);

    const subscription = useSubscription(FRIENDSHIP_INVITATION_ACCEPTED, { variables: { id: username }})

    useEffect(() => {
        if(Boolean(user)) {
            subscribeToMore({
                document: FRIENDSHIP_INVITATION_ACCEPTED,
                variables: { id: username },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || !Boolean(user)) return prev;

                    const friendshipStatus = subscriptionData.data.friendshipInvitationAccepted;
                    let friendships = [ ...prev.loggedUser.friendships ];

                    if(friendshipStatus.status === "DELETED") {
                        friendships = [ ...friendships.filter(friend => {
                            return (friend.username !== friendshipStatus.sender.username) && (friend.username !== friendshipStatus.receiver.username)
                        })]
                    } else {
                        if(user.username === friendshipStatus.sender.username) friendships.push(friendshipStatus.receiver);
                        else friendships.push(friendshipStatus.sender);
                    }

                    return Object.assign({}, prev, {
                        loggedUser: { ...prev.loggedUser, friendships }
                    });
                }
            });
        }
    }, [ user, subscribeToMore, username ]); 
  
};

export default useFriendshipsQuery;