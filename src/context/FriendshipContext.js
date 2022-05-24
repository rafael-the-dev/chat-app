import { createContext, useState } from 'react'

export const FriendshipContext = createContext();

export const FriendshipContextProvider = ({ children }) => {
    const [ tab, setTab ] = useState("SEARCH_FRIENDS");
    const [ searchKey, setSearchKey ] = useState("")

    return (
        <FriendshipContext.Provider value={{ searchKey, setSearchKey, setTab, tab }}>
            { children }
        </FriendshipContext.Provider>
    );
};