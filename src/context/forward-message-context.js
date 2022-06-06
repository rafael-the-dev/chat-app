import { createContext, useCallback, useState, useRef } from "react"

export const ForwardMessage = createContext();
ForwardMessage.displayName = "ForwardMessage";

export const ForwardMessageProvider = ({ children }) => {
    const [ openForwardMessageDialog, setOpenForwardMessageDialog ] = useState(false);
    const [ directContact, setDirectContact ] = useState("");
    const [ forwardDetails, setForwardDetails ] = useState({ directContact: "", group: "" });
    const messageVariables = useRef({});

    const addMessageVariables = useCallback((variables) => messageVariables.current = variables, []);

    return (
        <ForwardMessage.Provider value={{ addMessageVariables, directContact, forwardDetails, messageVariables, 
            openForwardMessageDialog, setOpenForwardMessageDialog, setDirectContact, setForwardDetails }}>
            { children }
        </ForwardMessage.Provider>
    );
};