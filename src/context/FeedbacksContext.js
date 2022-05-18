import { createContext, useEffect, useState } from 'react';
import { useQuery, useSubscription } from "@apollo/client"
import { GET_FEEDBACKS } from 'src/graphql/queries';
import { GET_FEEDBACKS__SUBSCRIPTION } from 'src/graphql/subscriptions';

export const FeedbacksContext = createContext();
FeedbacksContext.displayName = "FeedbacksContext";

export const FeedbacksContextProvider = ({ children }) => {
   

    return (
        <FeedbacksContext.Provider value={{ }}>
            { children }
        </FeedbacksContext.Provider>
    );
};
