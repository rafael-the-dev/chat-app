import { useContext, useEffect, useMemo } from 'react'
import { useSubscription } from "@apollo/client"

import { LoginContext } from "src/context"
import { USER_UPDATED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const useUserQuery = ({ subscribeToMore }) => {
    const { user } = useContext(LoginContext)
    const username = useMemo(() => user ? user.username : "", [ user ]);

    useSubscription(USER_UPDATED_SUBSCRIPTION, { variables: { username }})

    useEffect(() => {
        if(user) {
            subscribeToMore({
                document: USER_UPDATED_SUBSCRIPTION,
                variables: { username },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || !Boolean(user)) return prev;
                    
                    console.log("more", subscriptionData.data)
                    const { groupsInvitations } = subscriptionData.data.userUpdated;

                    return Object.assign({}, prev, {
                        loggedUser: { ...prev.loggedUser, groupsInvitations }
                    });
                }
            });
        }
    }, [ user, username, subscribeToMore ]);
};

export default useUserQuery;