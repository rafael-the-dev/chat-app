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
        <div className={classNames({ "hidden": searchFriendsFilter !== filterOptions.current.search }, "px-5 pt-6")}>
            {
                filterList?.map((item, index) => <FriendCard key={index} { ...item } />)
            }
        </div>
    );
};

export default Container;