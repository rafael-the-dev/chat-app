import { useRouter } from "next/router"
import { useMemo } from 'react'

import DirectChat from "./components/DirectChat"
import Home from "./components/Home"

const Container = () => {
    const router = useRouter();
    const { page } = router;

    const directChat = useMemo(() => <DirectChat />, []);
    const home = useMemo(() => <Home />, [])

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
        </>
    );
};

export default Container;