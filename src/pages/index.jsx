import { useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router'

import { LoginContext } from 'src/context';

import ChatPanel from "src/components/chat-panel-md";
import GroupDetails from "src/components/group-details"

const Home = () => {
    const router = useRouter();
    const { pathname } = router;

    const { currentPathname } = useContext(LoginContext);

    const chatPanelMemo = useMemo(() => <ChatPanel />, [])
    const groupDetails = useMemo(() => <GroupDetails />, []);

    useEffect(() => {
        currentPathname.current = pathname;
    }, [ currentPathname, pathname ])

    return (
        <>
            { chatPanelMemo }
            { groupDetails }
        </>
    );
    
};

export default Home;