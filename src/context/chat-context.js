import { createContext, useState } from "react"

export const ChatContext = createContext();
ChatContext.displayName = "ChatContext";

export const ChatContextProvider = ({ children }) => {
    const [ chatTab, setChatTab ] = useState("DIRECT_CHAT");
    const [ repliedMessage, setRepliedMessage ] = useState({});
    const [ openCreateGroupDialog, setOpenCreateGroupDialog ] = useState(false);

    return (
        <ChatContext.Provider value={{ chatTab, openCreateGroupDialog, repliedMessage, setChatTab, setOpenCreateGroupDialog, setRepliedMessage  }}>
            { children }
        </ChatContext.Provider>
    );
};
