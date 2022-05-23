import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
//import data from 'src/data.json';
//import { useDispatch } from 'react-redux'
//import { useQuery, useSubscription } from "@apollo/client"

//import { GET_USERS } from 'src/graphql/queries';
//import { DELETE_FEEDBACK_SUBSCRIPTION, GET_FEEDBACKS__SUBSCRIPTION, GET_FEEDBACK__SUBSCRIPTION } from 'src/graphql/subscriptions';
import { useUsersQuery, useFriendshipsQuery, useFriendshipsInvitationsQuery } from 'src/hooks';
import { LoginContext } from './LoginContext';
//import WebSocket from "ws"

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const { user } = useContext(LoginContext)
    const result = useUsersQuery(user);
    const friendshipsResult = useFriendshipsQuery(user);
    const friendshipInvitationsResult = useFriendshipsInvitationsQuery(user);

    const serverPublicURL = useRef("http://localhost:5000")
    const [ isLoading, setIsLoading ] = useState(false);
    const [ feedbacksList, setFeedbackList ] = useState([]);
    const [ error, setError ] = useState({ hasError: false, errorMessage: "" })

    const startLoading = useCallback(() => setIsLoading(true), [])
    const stopLoading = useCallback(() => setIsLoading(false), [])

    const addError = useCallback(({ hasError, errorMessage }) => setError({ hasError, errorMessage }), []);

    //const [ userProperties, setUserProperties ] = useState({ usersColors: {}, usersList: [], });
    const userOldProperties = useRef({ friendshipInvitations: [], usersColors: {}, usersList: []});

    const colorIndex = useRef(0);
    const getColor = useCallback(() => {
        const colors = [
            "#c10c0c",
            "rgb(143 13 117)",
            "rgb(97 93 177)",
            "rgb(163 115 18)",
            "rgb(205 81 81)",
            "rgb(73 126 30)",
            "#0048BA",
            "#8F9779",
            "#B284BE",
            "#89CFF0",
            "#7C0A02",
            "#3B7A57",
            "#FF7E00",
        ];

        if (colorIndex.current === colors.length) {
            colorIndex.current = 0;
        }
        const color = colors[colorIndex.current];
        colorIndex.current = colorIndex.current + 1;
        return color; //colors[Math.floor(Math.random() * colors.length)];
    }, []);
    
    const userProperties = useMemo(() => {
        const data = result.data;
        const friendshipInvitationsData = friendshipInvitationsResult.data;
        const friendshipsData = friendshipsResult.data;

        let properties = {};

        if(data) {
            colorIndex.current = 0;
            let usersColors = {};
            data.users.forEach(item => {
                if(!Object.keys(usersColors).includes(item.username)) {
                    usersColors = { ...usersColors, [item.username]: getColor() }
                }
            });
            
            //const newUserProperties = { ...userOldProperties.current };
            //userOldProperties.current = newUserProperties;
            properties = { ...properties, usersColors, usersList: data.users }
            //return newUserProperties;
        }
        
        if(friendshipInvitationsData) {
            properties = { ...properties, friendshipInvitations: friendshipInvitationsData.friendshipInvitations };
        }

        if(friendshipsData) {
            console.log(friendshipsData)
        }

        const newUserProperties = { ...userOldProperties.current, ...properties };
        userOldProperties.current = newUserProperties;
        return newUserProperties;
    }, [ friendshipsResult, friendshipInvitationsResult, getColor, result ]);

    const getBgColors = useCallback(() => userProperties.usersColors, [ userProperties ]);
    const getUsersList = useCallback(() => userProperties.usersList, [ userProperties ]);
    const getFriendshipInvitationsList = useCallback(() => userProperties.friendshipInvitations, [ userProperties ]);

    //const { subscribeToMore, ...result } = useQuery(GET_USERS);
   /* const feedbackSubscription = useSubscription(GET_FEEDBACK__SUBSCRIPTION, { 
        variables: { 
            id: "null"
        } 
    });

   const deleteFeedbackSubscription = useSubscription(DELETE_FEEDBACK_SUBSCRIPTION);*/

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
        console.log(err)
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

    //const subscription = useSubscription(GET_FEEDBACKS__SUBSCRIPTION)
    //const { subscribeToMore, ...result } = useQuery(GET_FEEDBACKS);

    /*const updateAllFeedbacks = useCallback((newFeedback) => {
        //console.log("hello rt")
        subscribeToMore({
            document: GET_FEEDBACKS__SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                console.log(prev)
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.feedbackCreated;
                console.log(prev);

                return Object.assign({}, prev, {
                    feedbacks: [ newFeedItem, ...prev.feedbacks ]
                });
            }
        });
    }, [ subscribeToMore ])*/

    /*useEffect(() => {
        subscribeToMore({
            document: GET_FEEDBACK__SUBSCRIPTION,
            variables: { id: "null" },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const feedbacks = [ ...prev.feedbacks ];
                const feedback = subscriptionData.data.feedbackUpdated;
                const index = feedbacks.findIndex(element => element.ID === feedback.ID);
                feedbacks[index] = feedback;

                return Object.assign({}, prev, {
                    feedbacks
                });
            }
        });
    }, [ subscribeToMore ]); */

    /*useEffect(() => {
        subscribeToMore({
            document: DELETE_FEEDBACK_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const feedback = subscriptionData.data.feedbackDeleted;
                const feedbacks = [ ...prev.feedbacks.filter(item => item.ID !== feedback.ID) ];

                return Object.assign({}, prev, {
                    feedbacks
                });
            }
        });
    }, [ subscribeToMore ]);

    useEffect(() => {
        updateAllFeedbacks();
    }, [ updateAllFeedbacks ]);*/

 
    /*useEffect(() => {
        const data = result.data;
        console.log(result)
        if(data) {
            let usersColors = {};
            data.users.forEach(item => {
                if(!Object.keys(usersColors).includes(item.username)) {
                    usersColors = { ...usersColors, [item.username]: getColor() }
                }
            });
            
            setUserProperties(userOldProperties => ({ ...userOldProperties, usersColors, usersList: data.users }));
        }
    }, [ getColor, result ]);*/

    /*useEffect(() => {
       subscribeToMore({
            document: GET_FEEDBACKS__SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.feedbackCreated;

                return Object.assign({}, prev, {
                feedbacks: [...prev.feedbacks, newFeedItem ]
                });
            }
        })
    }, [ subscribeToMore ])*/

    return (
        <AppContext.Provider 
            value={{ ...error.hasError, errorHandler, feedbacksList, getFriendshipInvitationsList, getInitialsNameLetters, getBgColors, getUsersList, 
                isLoading, setFeedbackList, serverPublicURL,
            startLoading, stopLoading }}>
            { children }
        </AppContext.Provider>
    );
};