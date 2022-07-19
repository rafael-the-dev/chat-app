import { useContext, useMemo } from "react"
import classNames from 'classnames'
import classes from "../styles/container.module.css"

import { AppContext } from "src/context/AppContext"
import { FriendshipContext } from "src/context/FriendshipContext";

import Card from "../friendship-card"
import Empty from "src/components/empty"

const FriendshipsContainer = () => {
    const { getFriendshipsList } = useContext(AppContext);
    const { searchKey, tab } = useContext(FriendshipContext);

    const filterList = useMemo(() => {
        if(tab !== "FRIENDS" || searchKey === "") return getFriendshipsList();

        const searchKeyLowerCased = searchKey.toLocaleLowerCase();
        return getFriendshipsList()?.filter(item => item.username.toLocaleLowerCase().includes(searchKeyLowerCased) || item.name.toLowerCase().includes(searchKeyLowerCased))
    }, [ searchKey, getFriendshipsList, tab ]);

    return (
        filterList?.length > 0 ? (
            <ul 
                className={classNames(classes.container, "mt-4 px-5", { 'hidden': tab !== 'FRIENDS' }, { 'sm:flex': tab === 'FRIENDS' },
                "list-none overflow-y-auto px-5 sm:items-start sm:flex-wrap sm:justify-between md:flex-col md:items-stretch md:flex-nowrap md:justify-start")}>
                {
                    filterList?.map((item, index) => <Card key={item.username} { ...item } /> )
                }
            </ul>
        ) : 
        <Empty 
            className={classNames(classes.emptyContainer, 
            { 'hidden': tab !== 'FRIENDS' })} 
            message={<>You don't have friends<br/>yet</>} 
        />
    );
};

export default FriendshipsContainer;