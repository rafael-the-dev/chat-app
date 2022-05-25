import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"


import { GET_DIRECT_CHAT } from 'src/graphql/queries';
import { USER_CREATED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const useDirectChatQuery = ({ dest, id, loggedUser }) => {
    //const subscription = useSubscription(USER_CREATED_SUBSCRIPTION)
    console.log(dest, id)
    const { subscribeToMore, ...result } = useQuery(GET_DIRECT_CHAT, { variables: { dest, id } });

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
    }, [ loggedUser, subscribeToMore ]); */
  
    useEffect(() => {
        console.log(result)
        if(result.data) {
            setData(result.data);
        }
    }, [ result ]);
  
    return { data, loading, error };
};

export default useDirectChatQuery;