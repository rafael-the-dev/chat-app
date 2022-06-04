import { createContext, useMemo, useState } from "react"
import { useGroupsQuery } from "src/hooks"

export const ChatContext = createContext();
ChatContext.displayName = "ChatContext";

export const ChatContextProvider = ({ children }) => {
    const groupsResult = useGroupsQuery();

    const [ chatTab, setChatTab ] = useState("DIRECT_CHAT");
    const [ repliedMessage, setRepliedMessage ] = useState({});
    const [ openCreateGroupDialog, setOpenCreateGroupDialog ] = useState(false);

    const groups = useMemo(() => {
        const { data } = groupsResult;

        if(data) return data.groups;

        return [];
    }, [ groupsResult ])

    return (
        <ChatContext.Provider value={{ chatTab, groups, openCreateGroupDialog, repliedMessage, setChatTab, setOpenCreateGroupDialog, setRepliedMessage  }}>
            { children }
        </ChatContext.Provider>
    );
};
