import { useMemo } from 'react';
import { useRouter } from 'next/router'

//import { AppContext } from "src/context/AppContext"
//import { LoginContext } from 'src/context/LoginContext';
//import { feedbacksComponentHelper, FeedbacksContext, FeedbacksContextProvider } from "src/context/FeedbacksContext"

import Chat from 'src/components/chat'
import Friendships from 'src/components/Friendship'
import ChatPanel from "src/components/chat-panel-md";
import GroupDetails from "src/components/group-details"

import { FriendshipContextProvider } from 'src/context/FriendshipContext';
import { ChatContextProvider, ForwardMessageProvider } from 'src/context';

const Home = () => {
    const router = useRouter();
    const { tab } = router.query;

    //const { feedbacksList, getInitialsNameLetters } = useContext(AppContext);
    //const { logout, user } = useContext(LoginContext);

    const chatMemo = useMemo(() => <Chat />, [])
    const friendshipsMemo = useMemo(() => <Friendships />, [])
    const chatPanelMemo = useMemo(() => <ChatPanel />, [])
    const groupDetails = useMemo(() => <GroupDetails />, [])

    /*const tabComponent = useMemo(() => {
        //console.log("")
        switch(tab) {
            case 'chat': {
                return <ChatContextProvider><ForwardMessageProvider>{ chatMemo }</ForwardMessageProvider></ChatContextProvider>;
            }
            case 'friends': {
                return <FriendshipContextProvider>{ friendshipsMemo }</FriendshipContextProvider>
            }
            default: {
                return <><h1 className="text-red-500">Welcome to my chat app</h1></>
            }
        }
    }, [ chatMemo, friendshipsMemo, tab ])*/

    return (
        <>
            <div className='h-ful sub-root dark:bg-stone-500'>
            <h1 className="text-red-500">Welcome to my chat app</h1>
            </div>
            { chatPanelMemo }
            { groupDetails }
        </>
    );
    
};

export default Home;