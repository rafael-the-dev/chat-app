import { useCallback, useContext, useEffect } from 'react'
import { useLazyQuery, useSubscription } from "@apollo/client"

import { LoginContext } from "src/context"

import { POST_UPDATED_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const usePostSubscription = ({ hasPostUpdate, subscribeToMore }) => {
    const { user } = useContext(LoginContext)

    useSubscription(POST_UPDATED_SUBSCRIPTION);

    const onDelete = useCallback(({ ID, posts }) => {
        const result  = posts.filter(post => post.ID !== ID);
        return result;
    }, []);

    const onUpdate = useCallback(({ posts, postUpdated }) => {
        const index = posts.findIndex(post => post.ID === postUpdated.ID);

        if(index !== -1) {
            posts[index] = { ...postUpdated }
        }

        return posts;
    }, [])

    useEffect(() => {
        subscribeToMore({
            document: POST_UPDATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const postUpdated = subscriptionData.data.postUpdated;
                let posts = prev.posts ? [ ...prev.posts ] : [];

                if(postUpdated.operation === "DELETED") {
                    posts = onDelete({ ID : postUpdated.post.ID, posts });
                    if(Boolean(user)) hasPostUpdate.current = true;
                } else if(postUpdated.operation === "UPDATED") {
                    posts = onUpdate({ posts, postUpdated: postUpdated.post })
                    if(Boolean(user)) hasPostUpdate.current = true;
                }

                return Object.assign({}, prev, {
                    posts
                });
            }
        });
    }, [ hasPostUpdate, onDelete, onUpdate, subscribeToMore, user ]); 
};