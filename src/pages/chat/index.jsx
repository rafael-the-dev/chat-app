import { useMemo } from "react"

import Container from "src/components/container"
import Chat from 'src/components/chat'

import { ChatContextProvider, ForwardMessageProvider } from 'src/context';

const ChatContainer = () => {
    const chatMemo = useMemo(() => <Chat />, [])

    return (
        <ChatContextProvider>
            <ForwardMessageProvider>
                <Container>
                    { chatMemo }
                </Container>
            </ForwardMessageProvider>
        </ChatContextProvider>
    );
};

export default ChatContainer;