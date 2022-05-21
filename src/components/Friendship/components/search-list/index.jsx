import classNames from 'classnames';
import { useContext, useMemo } from 'react'
import { AppContext } from 'src/context/AppContext';

import FriendCard from "../user-card";

const Container = ({ searchKey }) => {
    const { getUsersList } = useContext(AppContext);
    
    const filterList = useMemo(() => {
        if(searchKey === "") return getUsersList();

        const searchKeyLowerCased = searchKey.toLocaleLowerCase();
        return getUsersList()?.filter(item => item.username.toLocaleLowerCase().includes(searchKeyLowerCased) || item.name.toLowerCase().includes(searchKeyLowerCased))
    }, [ searchKey, getUsersList ]);

    return (
        <>
            {
                filterList?.map((item, index) => <FriendCard key={index} { ...item } />)
            }
        </>
    );
};

export default Container;