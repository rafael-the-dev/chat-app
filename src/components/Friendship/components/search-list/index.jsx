import classNames from 'classnames';
import { useCallback, useContext, useMemo } from 'react'
import classes from "../styles/container.module.css"

import { AppContext, LoginContext } from 'src/context';
import { FriendshipContext } from 'src/context/FriendshipContext';

import FriendCard from "../user-card";

const Container = () => {

    const { filterOptions, searchFriendsFilter, searchKey, tab } = useContext(FriendshipContext);
    const { getFriendshipsList, getUsersList } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext)
    
    const filterList = useMemo(() => {
        if(tab !== "SEARCH_FRIENDS" || searchKey === "") return getUsersList();

        const searchKeyLowerCased = searchKey.toLocaleLowerCase();
        return getUsersList()?.filter(item => item.username.toLocaleLowerCase().includes(searchKeyLowerCased) || item.name.toLowerCase().includes(searchKeyLowerCased))
    }, [ searchKey, getUsersList, tab ]);
    
    const isMyFriend = useCallback((username) => {
        if(username === loggedUser.username) return false;

        const hasUsername = getFriendshipsList().find(user => user.username === username);

        return !Boolean(hasUsername);
    }, [ getFriendshipsList, loggedUser ])

    return (//
        <ul 
            className={classNames(classes.container, { "hidden": searchFriendsFilter !== filterOptions.current.search }, 
            { "sm:flex": searchFriendsFilter === filterOptions.current.search },
            "list-none overflow-y-auto px-5 pt-4 sm:flex-wrap sm:justify-between md:flex-col md:flex-nowrap md:justify-start")}>
            {
                filterList?.filter(user => isMyFriend(user.username))
                    .map((item, index) => <FriendCard key={item.username} { ...item } />)
            }
        </ul>
    );
};

export default Container;