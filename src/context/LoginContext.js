import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { REVALIDATE_TOKEN, VALIDATE_TOKEN } from "src/graphql/mutations"
import { useRouter } from 'next/router'

export const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

export const LoginContextProvider = ({ children }) => {
    const validateToken = useMutation(VALIDATE_TOKEN);
    const revalidateTokenMutation = useMutation(REVALIDATE_TOKEN);
    const isFirstRender = useRef(true);

    const [ user, setUser ] = useState(null);
    const [ openRefreshTokenDialog, setOpenRefreshTokenDialog ] = useState(false);
    
    const dialogTimeoutRef = useRef(null);
    const verificationTimeoutRef = useRef(null);

    const addUser = useCallback((loggedUser) => {
        setUser(loggedUser)
    }, []);

    const getToken = useCallback(() => {
        const token = localStorage.getItem('__chat-app--token');

        if(token === null) return { expiresIn: 0, token: ""};

        try {
        const acessToken = JSON.parse(token);
        return acessToken;
        } catch(e) { return { expiresIn: 0, token: ""}; }
    }, [])

    useEffect(() => {
        const { token } = getToken();
        const validate = validateToken[0];
        if(isFirstRender.current) {
            validate({ 
                variables: {
                    token
                },
                onCompleted(data) {
                    //console.log(data)
                    if(data) {
                        const { name, username } = data.validateToken;
                        addUser({ name, username })
                    }
                },
                onError(err) {
                    console.log(err)
                }
            });
        }
        isFirstRender.current = false;

        return () => {
            if(isFirstRender.current) {
                isFirstRender.current = false;
            }
        };
    }, [ addUser, getToken, validateToken ]);
    
    const router = useRouter();
    const logout = useCallback(() => {
        localStorage.setItem("__chat-app--token", JSON.stringify({ expiresIn: 0, token: ""}))
        setUser(null);
        if(dialogTimeoutRef.current !== null) clearTimeout(dialogTimeoutRef.current)
        if(dialogTimeoutRef.current !== null) clearTimeout(verificationTimeoutRef.current)
        router.push("/login")
    }, [ router ]);
    
    const verifyExpirationTime = useCallback(() => {
        const { expiresIn } = getToken();

        if(Date.now() > new Date(expiresIn * 1000)) {
            logout();
        }
    }, [ getToken, logout ])

    const revalidateToken = useCallback(() => {
        let { expiresIn, token } = getToken();
        const revalidate = revalidateTokenMutation[0];

        revalidate({ 
            variables: {
                token
            },
            onCompleted(data) {
                //console.log(data)
                if(data) {
                    expiresIn = data.revalidateToken.expiresIn;
                    token = data.revalidateToken.token;
                    console.log(data)
                    localStorage.setItem("__chat-app--token", JSON.stringify({ expiresIn, token }))
        
                    const MS_PER_MINUTE = 60000;
                    const durationInMinutes = 5;
                    const myEndDateTime = new Date(expiresIn * 1000);
                    const myStartDate = new Date(myEndDateTime - durationInMinutes * MS_PER_MINUTE);
                    setOpenRefreshTokenDialog(false);

                    dialogTimeoutRef.current = setTimeout(() => {
                        setOpenRefreshTokenDialog(true);
                    }, myStartDate - Date.now());
                    verificationTimeoutRef.current = setTimeout(() => verifyExpirationTime(), myEndDateTime - Date.now());
                }
            },
            onError(err) {
                console.log(err)
            }
        });
    }, [ getToken, revalidateTokenMutation, verifyExpirationTime ])

    const checkExpirationToken = useCallback(() => {
        if(dialogTimeoutRef.current !== null) clearTimeout(dialogTimeoutRef.current)
        if(verificationTimeoutRef.current !== null) clearTimeout(verificationTimeoutRef.current)

        const { expiresIn } = getToken();

        const MS_PER_MINUTE = 60000;
        const durationInMinutes = 5;
        const myEndDateTime = new Date(expiresIn * 1000);
        const myStartDate = new Date(myEndDateTime - durationInMinutes * MS_PER_MINUTE);

        dialogTimeoutRef.current  = setTimeout(() => setOpenRefreshTokenDialog(true), myStartDate - Date.now());
        verificationTimeoutRef.current = setTimeout(() => verifyExpirationTime(), myEndDateTime - Date.now());
    }, [ getToken, verifyExpirationTime ])
    
    useEffect(() => {
        
        if(user !== null) checkExpirationToken()
        return () => {
            if(dialogTimeoutRef.current !== null) clearTimeout(dialogTimeoutRef.current)
            if(dialogTimeoutRef.current !== null) clearTimeout(verificationTimeoutRef.current)
        };
    }, [ user, checkExpirationToken ]);

    return (
        <LoginContext.Provider value={{ addUser, logout, openRefreshTokenDialog, revalidateToken, 
            setOpenRefreshTokenDialog, user }}>
            { children }
        </LoginContext.Provider>
    );
};