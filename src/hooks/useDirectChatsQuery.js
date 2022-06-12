import { useContext, useEffect, useMemo } from 'react'
import { useLazyQuery, useSubscription } from "@apollo/client"
import { LoginContext } from "src/context/LoginContext"

import { GET_DIRECTS_CHAT } from 'src/graphql/queries';
import { DIRECT_MESSAGE_SENT } from 'src/graphql/subscriptions';

export const useDirectChatsQuery = ({ loggedUser }) => {
    const { user } = useContext(LoginContext);
    const users = useMemo(() => user ? [ user.username, user.username ] : [], [ user ]);

    const subscription = useSubscription(DIRECT_MESSAGE_SENT, { variables: { users } });
    const [ getDirectChats, { data, loading, error, subscribeToMore } ] = useLazyQuery(GET_DIRECTS_CHAT);

    useEffect(() => {
        if(user) {
            subscribeToMore({
                document: DIRECT_MESSAGE_SENT,
                variables: { users },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;

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
        }
    }, [ subscribeToMore, user, users ]); 
  
    useEffect(() => {
        if(user) {
            getDirectChats()//setData(result.data);
        }
    }, [ getDirectChats, user ]);
  
    return { data, loading, error };
};

export default useDirectChatsQuery;