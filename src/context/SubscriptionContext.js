import { createContext, useCallback, useContext, useMemo, useRef } from 'react'

import { useDirectChatsQuery, useLoggedUserQuery, useUsersQuery, useFriendshipsQuery, 
    useFriendshipsInvitationsQuery, useNotifications, usePostsQuery, usePostSubscription } from 'src/hooks';
import { LoginContext } from './LoginContext';

export const SubscriptionContext = createContext();
SubscriptionContext.displayName = "SubscriptionContext";

export const SubscriptionContextProvider = ({ children }) => {
    const { loggedUser } = useContext(LoginContext);
    const hasPostUpdate = useRef(false);

    //const userResult = useUserQuery(loggedUser.username);
    const userResult = useLoggedUserQuery();
    const result = useUsersQuery(loggedUser);
    const { subscribeToMore } = userResult;
    useFriendshipsQuery({ subscribeToMore });
    useFriendshipsInvitationsQuery({ subscribeToMore });
    useDirectChatsQuery({ subscribeToMore });
    const postsResult = usePostsQuery();
    usePostSubscription({ hasPostUpdate, subscribeToMore: postsResult.subscribeToMore })
    useNotifications({ subscribeToMore })

    //const groupsListRef = useRef([]);
    const userOldProperties = useRef({ 
        directChats: [], 
        friendships: [], 
        friendshipInvitations: [], 
        groupsInvitations: [],
        notifications: [],
        usersColors: {}, 
        usersList: []
    });

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
        return color; 
    }, []);
    
    const userProperties = useMemo(() => {
        const data = result.data;
        const userData = userResult.data;

        let properties = {};

        if(data) {
            colorIndex.current = 0;
            let usersColors = {};
            data.users.forEach(item => {
                if(!Object.keys(usersColors).includes(item.username)) {
                    usersColors = { ...usersColors, [item.username]: getColor() }
                }
            });
            
            properties = { ...properties, usersColors, usersList: data.users };
        }

        if(userData) {
            properties = { ...properties, ...userData.loggedUser }; 
        }

        const newUserProperties = { ...userOldProperties.current, ...properties };
        userOldProperties.current = newUserProperties;
        return newUserProperties;
    }, [ getColor, result, userResult ]);
    console.log(userProperties.notifications)
    const posts = useMemo(() => {
        const postsData = postsResult.data;

        if(postsData) {
            return postsData.posts;
        }

        return [];
    }, [ postsResult ])

    const getBgColors = useCallback(() => userProperties.usersColors, [ userProperties ]);
    const getDirectChats = useCallback(() => userProperties.directChats, [ userProperties ]);
    const getFriendshipsList = useCallback(() => userProperties.friendships, [ userProperties ]);
    const getFriendshipInvitationsList = useCallback(() => userProperties.friendshipInvitations, [ userProperties ]);
    const getUsersList = useCallback(() => userProperties.usersList, [ userProperties ]);
    const getGroupsInvitations = useCallback(() => userProperties.groupsInvitations, [ userProperties ]);
    const getNotifications = useCallback(() => userProperties.notifications, [ userProperties ]);
    const getPosts = useCallback(() => posts, [ posts ]);

    return (
        <SubscriptionContext.Provider 
            value={{ getBgColors, getDirectChats, getFriendshipsList, getFriendshipInvitationsList, 
                getNotifications, getUsersList,
                getGroupsInvitations, getPosts, hasPostUpdate }}>
            { children }
        </SubscriptionContext.Provider>
    );
};