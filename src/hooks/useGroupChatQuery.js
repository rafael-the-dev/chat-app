import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"


import { GET_GROUP_CHAT } from 'src/graphql/queries';
import { DIRECT_MESSAGE_SENT } from 'src/graphql/subscriptions';

export const useGroupChatQuery = ({ dest, id, loggedUser, users }) => {
    //const subscription = useSubscription(DIRECT_MESSAGE_SENT, { variables: { users } });
    const { subscribeToMore, ...result } = useQuery(GET_GROUP_CHAT, { variables: { ID: id } });

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    /*useEffect(() => {
        subscribeToMore({
            document: DIRECT_MESSAGE_SENT,
            variables: { users },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !Boolean(loggedUser)) return prev;
                
                const chat = subscriptionData.data.messageSent;
                console.log(chat)
                return Object.assign({}, prev, {
                    directChat: { ...chat }
                });
            }
        });
    }, [ loggedUser, subscribeToMore, users ]); */
  
    useEffect(() => {
        if(result.data) {
            setData(result.data);
        }
    }, [ result ]);
  
    return { data, loading, error };
};

export default useGroupChatQuery;