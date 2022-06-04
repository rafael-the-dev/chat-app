import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"

import { GET_GROUPS } from 'src/graphql/queries';
//import { USER_CREATED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const useGroupsQuery = () => {
   // const subscription = useSubscription(USER_CREATED_SUBSCRIPTION)
    const { subscribeToMore, ...result } = useQuery(GET_GROUPS);

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    /*useEffect(() => {
        subscribeToMore({
            document: USER_CREATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !Boolean(loggedUser)) return prev;

                const user = subscriptionData.data.userCreated;
                const users = prev.users ? [ user, ...prev.users ] : [ user ];

                return Object.assign({}, prev, {
                    users
                });
            }
        });
    }, [ loggedUser, subscribeToMore ]);*/
  
    useEffect(() => {
        if(result.data) {
            setData(result.data);
        }
    }, [ result ]);
  
    return { data, loading, error };
};

export default useGroupsQuery;