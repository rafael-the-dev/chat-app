import { createContext, useState } from "react"

export const ChatContext = createContext();
ChatContext.displayName = "ChatContext";

export const ChatContextProvider = ({ children }) => {
    const [ chatTab, setChatTab ] = useState("DIRECT_CHAT");
    const [ repliedMessage, setRepliedMessage ] = useState({});

    return (
        <ChatContext.Provider value={{ chatTab, repliedMessage, setChatTab, setRepliedMessage  }}>
            { children }
        </ChatContext.Provider>
    );
};
