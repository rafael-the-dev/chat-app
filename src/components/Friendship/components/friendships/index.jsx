import { useContext, useMemo } from "react"
import classNames from 'classnames'
import { AppContext } from "src/context/AppContext"
import { FriendshipContext } from "src/context/FriendshipContext";

import Card from "../friendship-card"

const FriendshipsContainer = () => {
    const { getFriendshipsList } = useContext(AppContext);
    const { searchKey, tab } = useContext(FriendshipContext);

    const filterList = useMemo(() => {
        if(tab !== "FRIENDS" || searchKey === "") return getFriendshipsList();

        const searchKeyLowerCased = searchKey.toLocaleLowerCase();
        return getFriendshipsList()?.filter(item => item.username.toLocaleLowerCase().includes(searchKeyLowerCased) || item.name.toLowerCase().includes(searchKeyLowerCased))
    }, [ searchKey, getFriendshipsList, tab ]);

    return (
        <ul className={classNames("mt-4 px-5", { 'hidden': tab !== 'FRIENDS' })}>
            {
                tab === 'FRIENDS' && filterList?.map((item, index) => <Card key={item.username} { ...item } /> )
            }
        </ul>
    );
};

export default FriendshipsContainer;