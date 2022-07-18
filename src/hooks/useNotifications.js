import { useContext, useEffect, useMemo } from 'react'
import { useSubscription } from "@apollo/client"
import { LoginContext } from "src/context/LoginContext"

import { NOTIFICATION_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const useNotifications = ({ hasNewNotifications, subscribeToMore }) => {
    const { loggedUser, user } = useContext(LoginContext);
    const username = useMemo(() => loggedUser.username, [ loggedUser ]);

    useSubscription(NOTIFICATION_SUBSCRIPTION, { variables: { username }})

    useEffect(() => {
        if(Boolean(user)) {
            subscribeToMore({
                document: NOTIFICATION_SUBSCRIPTION,
                variables: { username },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || !Boolean(user)) return prev;
                    
                    const { notification } = subscriptionData.data;
                    let notifications = prev.loggedUser ? [ notification, ...prev.loggedUser.notifications ] : [ notification ];

                    hasNewNotifications.current = true;

                    return Object.assign({}, prev, {
                        loggedUser: { ...prev.loggedUser, notifications }
                    });
                }
            });
        }
    }, [ hasNewNotifications, user, subscribeToMore, username ]); 
  
};

export default useNotifications;