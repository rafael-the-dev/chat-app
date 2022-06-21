import { useContext, useEffect, useMemo, useState } from 'react'
import { useLazyQuery, useSubscription } from "@apollo/client"

import { LoginContext } from "src/context"
import { GET_LOGGED_USER_DETAILS } from 'src/graphql/queries';

export const useLoggedUserQuery = () => {
    const { user } = useContext(LoginContext)

    const [ getLoggedUserDetails, { data, loading, error, subscribeToMore } ] = useLazyQuery(GET_LOGGED_USER_DETAILS);

    useEffect(() => {
        if(user) {
            getLoggedUserDetails();
        }
    }, [ getLoggedUserDetails, user ]);

    /*useEffect(() => {
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
    }, [ user, username, subscribeToMore ]);*/
  
    return { data, error, loading, subscribeToMore };
};

export default useLoggedUserQuery;