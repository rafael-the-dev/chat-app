import { createContext, useState } from 'react'

export const FriendshipContext = createContext();

export const FriendshipContextProvider = ({ children }) => {
    const [ tab, setTab ] = useState("SEARCH_FRIENDS");

    return (
        <FriendshipContext.Provider value={{ setTab, tab }}>
            { children }
        </FriendshipContext.Provider>
    );
};