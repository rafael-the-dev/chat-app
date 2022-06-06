import { useContext, useEffect, useMemo, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"

import { LoginContext } from "src/context"
import { GET_USER } from 'src/graphql/queries';
import { USER_CREATED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const useUserQuery = () => {
    const { user } = useContext(LoginContext)
   // const subscription = useSubscription(USER_CREATED_SUBSCRIPTION)
   const username = useMemo(() => user ? user.username : "", [ user ]);
    const { subscribeToMore, ...result } = useQuery(GET_USER, { variables: { username }});

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        subscribeToMore({
            document: USER_CREATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !Boolean(user)) return prev;
                console.log(subscriptionData); return prev;
                //const user = subscriptionData.data.userCreated;
                /*const users = prev.users ? [ user, ...prev.users ] : [ user ];

                return Object.assign({}, prev, {
                    users
                });*/
            }
        });
    }, [ user, subscribeToMore ]);
  
    useEffect(() => {
        if(result.data) {
            setData(result.data);
        }
    }, [ result ]);
  
    return { data, loading, error };
};

export default useUserQuery;