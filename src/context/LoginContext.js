import { createContext, useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useMutation } from '@apollo/client'
import { LOGOUT, REVALIDATE_TOKEN, VALIDATE_TOKEN } from "src/graphql/mutations"
import { useRouter } from 'next/router'

export const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

export const LoginContextProvider = ({ children }) => {
    const validateToken = useMutation(VALIDATE_TOKEN);
    const revalidateTokenMutation = useMutation(REVALIDATE_TOKEN);
    const logoutMutation = useMutation(LOGOUT);
    const isFirstRender = useRef(true);

    const [ user, setUser ] = useState(null);
    const [ openRefreshTokenDialog, setOpenRefreshTokenDialog ] = useState(false);
    const [ isValidatingToken, setIsValidatingToken ] = useState(false);
    const [ isPending, startTransition ] = useTransition();
    
    const dialogTimeoutRef = useRef(null);
    const verificationTimeoutRef = useRef(null);
    const canICheckToken = useRef(true);

    const loggedUser = useMemo(() => {
        if(user) return user;
        return {};
    }, [ user ])

    const addUser = useCallback((newUser) => {
        setUser(newUser)
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
            setIsValidatingToken(true);

            validate({ 
                variables: {
                    token
                },
                onCompleted(data) {
                    if(data) {
                        const { image, name, username } = data.validateToken;
                        addUser({ image, name, username });
                        startTransition(() => setIsValidatingToken(true));
                    }
                },
                onError(err) {
                    console.log(err);
                    setIsValidatingToken(true);
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
        const logoutUser = logoutMutation[0];

        const exit = () => {
            localStorage.setItem("__chat-app--token", JSON.stringify({ expiresIn: 0, token: ""}))
            setUser(null);
            if(dialogTimeoutRef.current !== null) clearTimeout(dialogTimeoutRef.current)
            if(verificationTimeoutRef.current !== null) clearTimeout(verificationTimeoutRef.current)
            router.push("/login");
        };

        logoutUser({
            onCompleted() {
                exit();
            },
            onError(error) {
                exit();
            }
        })
    }, [ logoutMutation, router ]);
    
    const verifyExpirationTime = useCallback(() => {
        const { expiresIn } = getToken();
        const MS_PER_MINUTE = 60000;

        if(Date.now() >= new Date((expiresIn * 1000) - (2 * MS_PER_MINUTE))) {
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
                    if(dialogTimeoutRef.current !== null) clearTimeout(dialogTimeoutRef.current)
                    if(verificationTimeoutRef.current !== null) clearTimeout(verificationTimeoutRef.current)

                    expiresIn = data.revalidateToken.expiresIn;
                    token = data.revalidateToken.token;
                    localStorage.setItem("__chat-app--token", JSON.stringify({ expiresIn, token }))
        
                    const MS_PER_MINUTE = 60000;
                    const durationInMinutes = 5;
                    const myEndDateTime = new Date((expiresIn * 1000) - (2 * MS_PER_MINUTE));
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
        const myEndDateTime = new Date((expiresIn * 1000) - (2 * MS_PER_MINUTE));
        const myStartDate = new Date(myEndDateTime - durationInMinutes * MS_PER_MINUTE);

        dialogTimeoutRef.current  = setTimeout(() => setOpenRefreshTokenDialog(true), myStartDate - Date.now());
        verificationTimeoutRef.current = setTimeout(() => verifyExpirationTime(), myEndDateTime - Date.now());
    }, [ getToken, verifyExpirationTime ])
    
    useEffect(() => {
        if(user !== null) checkExpirationToken();
        return () => {
            if(dialogTimeoutRef.current !== null) clearTimeout(dialogTimeoutRef.current)
            if(verificationTimeoutRef.current !== null) clearTimeout(verificationTimeoutRef.current)
        };
    }, [ user, checkExpirationToken ]);

    return (
        <LoginContext.Provider value={{ addUser, dialogTimeoutRef, isValidatingToken, loggedUser, logout, openRefreshTokenDialog, revalidateToken, 
            setOpenRefreshTokenDialog, user }}>
            { children }
        </LoginContext.Provider>
    );
};