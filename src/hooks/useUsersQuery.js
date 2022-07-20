import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from "@apollo/client"


import { GET_USERS } from 'src/graphql/queries';
import { USER_CREATED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const useUsersQuery = (loggedUser) => {
    useSubscription(USER_CREATED_SUBSCRIPTION)
    const { subscribeToMore, ...result } = useQuery(GET_USERS);

    useEffect(() => {
        subscribeToMore({
            document: USER_CREATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !Boolean(loggedUser)) return prev;

                const user = subscriptionData.data.userCreated;
                let users = prev.users ? [ ...prev.users ] : [];

                const userIndex = users.findIndex(registeredUser => registeredUser.username === user.username);

                if(userIndex !== -1) {
                    users[userIndex] = user;
                } else {
                    users = [ user, ...users ];
                }

                return Object.assign({}, prev, {
                    users
                });
            }
        });
    }, [ loggedUser, subscribeToMore ]); 
  
    return { ...result };
};

export default useUsersQuery;