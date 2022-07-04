import { useEffect } from 'react'
import { useLazyQuery, useSubscription } from "@apollo/client"

import { GET_POSTS } from 'src/graphql/queries';
import { POST_ADDED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const usePostsQuery = () => {
    useSubscription(POST_ADDED_SUBSCRIPTION)
    const [ getPosts, { data, loading, error, subscribeToMore } ] = useLazyQuery(GET_POSTS);

    useEffect(() => {
        subscribeToMore({
            document: POST_ADDED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const post = subscriptionData.data.postAdded;
                let posts = prev.posts ? [ post, ...prev.posts ] : [ post ];

                return Object.assign({}, prev, {
                    posts
                });
            }
        });
    }, [ subscribeToMore ]); 
  
    useEffect(() => {
        getPosts();
    }, [ getPosts ]);
  
    return { data, loading, error, subscribeToMore };
};