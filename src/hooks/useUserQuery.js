import { useContext, useEffect, useMemo, useState } from 'react'
import { useLazyQuery, useSubscription } from "@apollo/client"

import { LoginContext } from "src/context"
import { GET_USER } from 'src/graphql/queries';
import { USER_UPDATED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const useUserQuery = () => {
    const { user } = useContext(LoginContext)
    const username = useMemo(() => user ? user.username : "", [ user ]);
    const subscription = useSubscription(USER_UPDATED_SUBSCRIPTION, { variables: { username }})
    const [ getUser, { data, loading, error, subscribeToMore } ] = useLazyQuery(GET_USER, { variables: { username }});

    useEffect(() => {
        if(user) {
            subscribeToMore({
                document: USER_UPDATED_SUBSCRIPTION,
                variables: { username },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || !Boolean(user)) return prev;

                    const updatedUser = subscriptionData.data.userUpdated;

                    return Object.assign({}, prev, {
                        user: { ...updatedUser }
                    });
                }
            });
        }
    }, [ user, username, subscribeToMore ]);
  
    return { data, loading, error };
};

export default useUserQuery;