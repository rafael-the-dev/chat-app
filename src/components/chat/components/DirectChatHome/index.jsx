import { useContext, useMemo } from "react"

import { LoginContext } from "src/context/LoginContext"
import { useDirectChatsQuery } from "src/hooks"

import MessageCard from "./components/message-card"

const DirectChatHome = () => {
    const { user } = useContext(LoginContext)

    const { data } = useDirectChatsQuery({ loggedUser: user });

    const directChats = useMemo(() => {
        if(data) return data.directChats;
        return [];
    }, [ data ])
    
    return (
        <div className="px-5 pt-4">
            {
                directChats.map((item, index) => <MessageCard key={index} { ...item } />)
            }
        </div>
    );
};

export default  DirectChatHome;