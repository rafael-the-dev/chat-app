import { useEffect, useMemo, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"


import { GET_DIRECTS_CHAT } from 'src/graphql/queries';
import { DIRECT_MESSAGE_SENT } from 'src/graphql/subscriptions';

export const useDirectChatsQuery = ({ loggedUser }) => {
    const users = useMemo(() => loggedUser ? [ loggedUser.username, loggedUser.username ] : [], [ loggedUser ]);

    const subscription = useSubscription(DIRECT_MESSAGE_SENT, { variables: { users } });
    const { subscribeToMore, ...result } = useQuery(GET_DIRECTS_CHAT);

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        subscribeToMore({
            document: DIRECT_MESSAGE_SENT,
            variables: { users },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !Boolean(loggedUser)) return prev;

                const chats = [ ...prev.directChats ]
                const receivedChat = subscriptionData.data.messageSent;

                const chatIndex = chats.findIndex(item => item.ID === receivedChat.ID);

                if(chatIndex !== -1) {
                    chats[chatIndex] = receivedChat;

                    return Object.assign({}, prev, {
                        directChats: [...chats ]
                    });
                }

                return prev;
            }
        });
    }, [ loggedUser, subscribeToMore, users ]); 
  
    useEffect(() => {
        if(result.data) {
            setData(result.data);
        }
    }, [ result ]);
  
    return { data, loading, error };
};

export default useDirectChatsQuery;