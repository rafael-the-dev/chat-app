import classNames from 'classnames';
import { useContext, useMemo } from 'react'
import { AppContext } from 'src/context/AppContext';
import { FriendshipContext } from 'src/context/FriendshipContext';

import FriendCard from "../user-card";

const Container = () => {
    const { getUsersList } = useContext(AppContext);
    const { filterOptions, searchFriendsFilter, searchKey, tab } = useContext(FriendshipContext);
    
    const filterList = useMemo(() => {
        if(tab !== "SEARCH_FRIENDS" || searchKey === "") return getUsersList();

        const searchKeyLowerCased = searchKey.toLocaleLowerCase();
        return getUsersList()?.filter(item => item.username.toLocaleLowerCase().includes(searchKeyLowerCased) || item.name.toLowerCase().includes(searchKeyLowerCased))
    }, [ searchKey, getUsersList, tab ]);

    return (
        <ul className={classNames({ "hidden": searchFriendsFilter !== filterOptions.current.search }, "list-none px-5 pt-6")}>
            {
                filterList?.map((item, index) => <FriendCard key={item.username} { ...item } />)
            }
        </ul>
    );
};

export default Container;