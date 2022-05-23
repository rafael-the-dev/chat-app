import { useContext } from "react"
import { AppContext } from "src/context/AppContext"

import Card from "../friendship-card"

const FriendshipsContainer = () => {
    const { getFriendshipsList } = useContext(AppContext);

    console.log()

    return (
        <>
            {
                getFriendshipsList()?.map((item, index) => <Card key={index} { ...item } /> )
            }
        </>
    );
};

export default FriendshipsContainer;