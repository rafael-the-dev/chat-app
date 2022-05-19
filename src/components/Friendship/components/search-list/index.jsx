import classNames from 'classnames';
import { useContext, useMemo } from 'react'
import { AppContext } from 'src/context/AppContext';

import FriendCard from "../user-card";

const Container = ({ className, searchKey }) => {
    const { getUsersList } = useContext(AppContext);
    
    const filterList = useMemo(() => {
        if(searchKey === "") return getUsersList();

        const searchKeyLowerCased = searchKey.toLocaleLowerCase();
        return getUsersList()?.filter(item => item.username.toLocaleLowerCase().includes(searchKeyLowerCased) || item.name.toLowerCase().includes(searchKeyLowerCased))
    }, [ searchKey, getUsersList ]);

    return (
        <div className={classNames(className, "px-5 pt-6")}>
            {
                filterList?.map((item, index) => <FriendCard key={index} { ...item } />)
            }
        </div>
    );
};

export default Container;