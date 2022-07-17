import { useContext, useEffect } from 'react'
import { useQuery, useSubscription } from "@apollo/client"

import { LoginContext } from "src/context"

import { GET_POST } from "src/graphql/queries"
import { UPDATED_POST_SUBSCRIPTION } from 'src/graphql/subscriptions';

export const usePost = ({ id }) => {
    const { user } = useContext(LoginContext)
    const { subscribeToMore, ...result } = useQuery(GET_POST, { variables: { id }});

    useSubscription(UPDATED_POST_SUBSCRIPTION, { variables: { id }});

    useEffect(() => {
        if(user) {
            subscribeToMore({
                document: UPDATED_POST_SUBSCRIPTION,
                variables: { id },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    console.log("data", subscriptionData)
                    const { updatedPost } = subscriptionData.data;


                    return Object.assign({}, prev, {
                        post: { ...updatedPost }
                    });
                }
            });
        }
    }, [ id, subscribeToMore, user ]); 
   
    return { ...result };
};