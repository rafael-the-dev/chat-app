import { useContext, useEffect } from 'react'
import { useLazyQuery, useSubscription } from "@apollo/client"

import { LoginContext } from "src/context"

import { GET_POSTS } from 'src/graphql/queries';
import { POST_ADDED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const usePostsQuery = () => {
    const { user } = useContext(LoginContext)

    useSubscription(POST_ADDED_SUBSCRIPTION)
    const [ getPosts, { data, loading, error, subscribeToMore } ] = useLazyQuery(GET_POSTS);

    useEffect(() => {
        if(user) {
            subscribeToMore({
                document: POST_ADDED_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || !Boolean(user)) return prev;

                    const post = subscriptionData.data.postAdded;
                    let posts = prev.posts ? [ post, ...prev.posts ] : [ post ];

                    return Object.assign({}, prev, {
                        posts
                    });
                }
            });
        }
    }, [ subscribeToMore, user ]); 
  
    useEffect(() => {
        if(user) {
            getPosts();
        }
    }, [ getPosts, user ]);
  
    return { data, loading, error };
};