import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { ChatContextProvider, ForwardMessageProvider } from 'src/context';

import DirectChat from "src/components/chat/components/DirectChat";
import GroupChat from "src/components/chat/components/group-chat";

const ChatPanel = () => {
    const router = useRouter();
    const { page } = router.query;

    const directChat = useMemo(() => <DirectChat />, []);
    const groupChat = useMemo(() => <GroupChat />, [])
    
    const selectedPage = useMemo(() => {
        switch(page) {
            case "direct-chat": {
                return directChat;
            }
            case "group-chat": {
                return groupChat;
            }
            default: {
                return;
            }
        }
    }, [ directChat, groupChat, page ]);

    return (
        <ChatContextProvider>
            <ForwardMessageProvider>
                <div className="grow">
                    { selectedPage }
                </div>
            </ForwardMessageProvider>
        </ChatContextProvider>
    );
};

export default ChatPanel;