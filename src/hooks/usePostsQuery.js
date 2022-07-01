import { useContext, useEffect } from 'react'
import { useLazyQuery, useSubscription } from "@apollo/client"

import { LoginContext } from "src/context"

import { GET_POSTS } from 'src/graphql/queries';
import { USER_CREATED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const usePostsQuery = (loggedUser) => {
    const { user } = useContext(LoginContext)

    //const subscription = useSubscription(USER_CREATED_SUBSCRIPTION)
    const [ getPosts, { data, loading, error, subscribeToMore } ] = useLazyQuery(GET_POSTS);

    /*useEffect(() => {
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
    }, [ loggedUser, subscribeToMore ]); */
  
    useEffect(() => {
        if(user) {
            console.log("getting posts...")
            getPosts();
        }
    }, [ getPosts, user ]);
  
    return { data, loading, error };
};