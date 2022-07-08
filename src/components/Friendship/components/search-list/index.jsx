import classNames from 'classnames';
import { useCallback, useContext, useMemo } from 'react'
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

    return (
        <ul 
            className={classNames({ "hidden": searchFriendsFilter !== filterOptions.current.search }, 
            { "sm:flex": searchFriendsFilter === filterOptions.current.search },
            "list-none px-5 pt-6 sm:flex-wrap sm:justify-between md:flex-col")}>
            {
                filterList?.filter(user => isMyFriend(user.username))
                    .map((item, index) => <FriendCard key={item.username} { ...item } />)
            }
        </ul>
    );
};

export default Container;