import { createContext, useState } from "react"

export const ChatContext = createContext();
ChatContext.displayName = "ChatContext";

export const ChatContextProvider = ({ children }) => {
    const [ repliedMessage, setRepliedMessage ] = useState({});

    return (
        <ChatContext.Provider value={{ repliedMessage, setRepliedMessage  }}>
            { children }
        </ChatContext.Provider>
    );
};
