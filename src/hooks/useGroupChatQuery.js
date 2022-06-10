import { useContext, useEffect, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"


import { GET_GROUP_CHAT } from 'src/graphql/queries';
import { GROUP_UPDATED } from 'src/graphql/subscriptions';

import { LoginContext } from "src/context"

export const useGroupChatQuery = ({ dest, id, loggedUser, users }) => {
    const { user } = useContext(LoginContext);

    const subscription = useSubscription(GROUP_UPDATED, { variables: { id } });
    const { subscribeToMore, ...result } = useQuery(GET_GROUP_CHAT, { variables: { ID: id } });

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if(user) {
            subscribeToMore({
                document: GROUP_UPDATED,
                variables: { id },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || !Boolean(user)) return prev;
                    
                    const group = subscriptionData.data.groupUpdated;
                    return Object.assign({}, prev, {
                        group: { ...group }
                    });
                }
            });
        }
    }, [ id, user, subscribeToMore ]); 
  
    useEffect(() => {
        if(result.data) {
            setData(result.data);
        }
    }, [ result ]);
  
    return { data, loading, error };
};

export default useGroupChatQuery;