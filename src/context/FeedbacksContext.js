import { createContext,  } from 'react';

export const FeedbacksContext = createContext();
FeedbacksContext.displayName = "FeedbacksContext";

export const FeedbacksContextProvider = ({ children }) => {
   

    return (
        <FeedbacksContext.Provider value={{ }}>
            { children }
        </FeedbacksContext.Provider>
    );
};
