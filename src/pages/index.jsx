import { useMemo } from 'react';
import { useRouter } from 'next/router'

//import { AppContext } from "src/context/AppContext"
//import { LoginContext } from 'src/context/LoginContext';
//import { feedbacksComponentHelper, FeedbacksContext, FeedbacksContextProvider } from "src/context/FeedbacksContext"

import Chat from 'src/components/chat'
import Friendships from 'src/components/Friendship'
import { FriendshipContextProvider } from 'src/context/FriendshipContext';
import { ForwardMessageProvider } from 'src/context';

const Home = () => {
    const router = useRouter();
    const { tab } = router.query;

    //const { feedbacksList, getInitialsNameLetters } = useContext(AppContext);
    //const { logout, user } = useContext(LoginContext);

    const chatMemo = useMemo(() => <Chat />, [])
    const friendshipsMemo = useMemo(() => <Friendships />, [])

    const tabComponent = useMemo(() => {
        //console.log("")
        switch(tab) {
            case 'chat': {
                return <ForwardMessageProvider>{ chatMemo }</ForwardMessageProvider>;
            }
            case 'friends': {
                return <FriendshipContextProvider>{ friendshipsMemo }</FriendshipContextProvider>
            }
            default: {
                return <><h1 className="text-red-500">Welcome to my chat app</h1></>
            }
        }
    }, [ chatMemo, friendshipsMemo, tab ])

    return (
        <>
            { tabComponent }
        </>
    );
    
};

export default Home;