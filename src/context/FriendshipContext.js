import { createContext, useRef, useState } from 'react'

export const FriendshipContext = createContext();

export const FriendshipContextProvider = ({ children }) => {
    const [ tab, setTab ] = useState("SEARCH_FRIENDS");
    const [ searchKey, setSearchKey ] = useState("");
    const [ searchFriendsFilter, setSearchFriendsFilter ] = useState("SEARCH")

    const filterOptions = useRef({
        invitations: "INVITATIONS",
        search: "SEARCH",
    })

    return (
        <FriendshipContext.Provider value={{ filterOptions, searchFriendsFilter, searchKey, setSearchFriendsFilter, setSearchKey, setTab, tab }}>
            { children }
        </FriendshipContext.Provider>
    );
};