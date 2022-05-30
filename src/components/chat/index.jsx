import { useRouter } from "next/router"
import { useCallback, useContext, useMemo } from 'react'

import { ForwardMessage } from "src/context";

import ForwardMessageDialog from "src/components/forward-message"
import DirectChat from "./components/DirectChat"
import Home from "./components/Home"

const Container = () => {
    const router = useRouter();
    const { page } = router.query;

    const { openForwardMessageDialog, setOpenForwardMessageDialog } = useContext(ForwardMessage);

    const closeForwardMessageDialog = useCallback(() => setOpenForwardMessageDialog(false), [ setOpenForwardMessageDialog ])

    const directChat = useMemo(() => <DirectChat />, []);
    const home = useMemo(() => <Home />, []);
    const forwardMessageDialog = useMemo(() => <ForwardMessageDialog />, [])
    
    const selectedPage = useMemo(() => {
        switch(page) {
            case "direct-chat": {
                return directChat;
            }
            default: {
                return home;
            }
        }
    }, [ directChat, home, page ])

    return (
        <>
            { selectedPage }
            { forwardMessageDialog }
        </>
    );
};

export default Container;