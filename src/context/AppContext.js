import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { SubscriptionContext } from "./SubscriptionContext"

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const { getBgColors, getDirectChats, getFriendshipsList, getFriendshipInvitationsList, 
        getNotifications, getUsersList,
        getGroupsInvitations, getPosts, hasPostUpdate, hasNewNotifications } = useContext(SubscriptionContext)
    const serverPublicURL = useRef("http://localhost:5000");

    const [ isLoading, setIsLoading ] = useState(false);
    const [ feedbacksList, setFeedbackList ] = useState([]);
    const [ error, setError ] = useState({ hasError: false, errorMessage: "" });
    const [ openForwardMessageDialog, setOpenForwardMessageDialog ] = useState(false)
    const [ openGroupDetailsDrawer, setOpenGroupDetailsDrawer ] = useState({ group: null, open: false });
    const groupsListRef = useRef([]);

    const startLoading = useCallback(() => setIsLoading(true), [])
    const stopLoading = useCallback(() => setIsLoading(false), [])
    //const addGroups =  useCallback(list => groupsListRef.current = list, []);
    const addError = useCallback(({ hasError, errorMessage }) => setError({ hasError, errorMessage }), []);

    //const [ userProperties, setUserProperties ] = useState({ usersColors: {}, usersList: [], });
    

    const getInitialsNameLetters = useCallback(name => {
        let result = "";
    
        if (name && typeof name === "string") {
          let splittedName = name.split(" ");
    
          if (splittedName.length === 0) {
            splittedName = name.split("-");
          }

          if (splittedName.length > 2) {
            result = splittedName[0].charAt(0) + splittedName[splittedName.length - 1].charAt(0);
          } else {
            splittedName.forEach((item) => (result += item.charAt(0)));
          }
        }
        return result;
    }, []);

    const errorHandler = useCallback((err) => {
        console.error(err)
        err.graphQLErrors.forEach(error => {
            switch(error.extensions.code) {
                case "BAD_USER_INPUT": {
                    addError({ hasError: true, errorMessage: error.message })
                    return;
                }
                default: {
                    addError({ hasError: true, errorMessage: error.message });
                    return;
                }
            }
        })
    }, [ addError ]);

    return (
        <AppContext.Provider 
            value={{ ...error.hasError, errorHandler, feedbacksList, openGroupDetailsDrawer, setOpenGroupDetailsDrawer, getDirectChats, getFriendshipInvitationsList, 
            getInitialsNameLetters, getBgColors, getFriendshipsList, getGroupsInvitations, getNotifications, getPosts, getUsersList, hasPostUpdate, hasNewNotifications,
            isLoading, openForwardMessageDialog, setFeedbackList, serverPublicURL,
            startLoading, stopLoading, setOpenForwardMessageDialog }}>
            { children }
        </AppContext.Provider>
    );
};