import { createContext, useState } from "react"

export const ForwardMessage = createContext();
ForwardMessage.displayName = "ForwardMessage";

export const ForwardMessageProvider = ({ children }) => {
    const [ openForwardMessageDialog, setOpenForwardMessageDialog ] = useState(false);

    return (
        <ForwardMessage.Provider value={{ openForwardMessageDialog, setOpenForwardMessageDialog }}>
            { children }
        </ForwardMessage.Provider>
    );
};