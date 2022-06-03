import { createContext } from "react"


const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    return (
        <ChatContext.Provider value={{}}>
            { children }
        </ChatContext.Provider>
    );
};