import { useContext, useMemo } from "react"

import { LoginContext } from "src/context/LoginContext"
import { useDirectChatsQuery } from "src/hooks"

import MessageCard from "./components/message-card"

const DirectChatHome = () => {
    const { user } = useContext(LoginContext)

    const { data } = useDirectChatsQuery({ loggedUser: user });

    const directChats = useMemo(() => {
        if(data) {
            const chats = [ ...data.directChats ];

            const sortedData = chats.sort((a, b) => {
                const aDate = new Date(parseInt(a.messages[a.messages.length - 1].createdAt));
                const bDate = new Date(parseInt(b.messages[b.messages.length - 1].createdAt));

                return bDate - aDate;
            });

            return sortedData;
        }
        return [];
    }, [ data ])
    
    return (
        <div className="pt-4">
            {
                directChats.map((item, index) => <MessageCard key={index} { ...item } />)
            }
        </div>
    );
};

export default  DirectChatHome;