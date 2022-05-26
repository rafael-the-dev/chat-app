import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"


import { GET_DIRECT_CHAT } from 'src/graphql/queries';
import { DIRECT_MESSAGE_SENT } from 'src/graphql/subscriptions';

export const useDirectChatQuery = ({ dest, id, loggedUser }) => {
    const subscription = useSubscription(DIRECT_MESSAGE_SENT)
    const { subscribeToMore, ...result } = useQuery(GET_DIRECT_CHAT, { variables: { dest, id } });

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        subscribeToMore({
            document: DIRECT_MESSAGE_SENT,
            variables: { username: dest },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !Boolean(loggedUser)) return prev;
                
                const chat = subscriptionData.data.messageSent;
                return Object.assign({}, prev, {
                    directChat: { ...chat }
                });
            }
        });
    }, [ dest, loggedUser, subscribeToMore ]); 
  
    useEffect(() => {
        console.log(result)
        if(result.data) {
            setData(result.data);
        }
    }, [ result ]);
  
    return { data, loading, error };
};

export default useDirectChatQuery;