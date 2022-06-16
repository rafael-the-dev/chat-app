import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { Alert, AlertTitle, Collapse, LinearProgress } from "@mui/material"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import classNames from 'classnames'
import globalStyles from "src/styles/global-styles.module.css"

import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from 'src/context/AppContext';
import { ChatContextProvider, ForwardMessageProvider } from 'src/context';

import Chat from "../chat-panel-md"
import Footer from 'src/components/Footer';

const Container = ({ children }) => {
    const router = useRouter();
    const { pathname } = router;
    const { tab } = router.query;

    const { openRefreshTokenDialog, revalidateToken, setOpenRefreshTokenDialog, user } = useContext(LoginContext)
    const { errorMessage, hasError, isLoading } = useContext(AppContext)

    const rootRef = useRef(null);
    const chatMemo = useMemo(() => <Chat />)

    const isLogged = useMemo(() => (![ '/login', '/signup' ].includes(pathname)) && user !== null, [ pathname, user ])
    const pathnameRef = useRef("");
    
    const closeDialog = useCallback(() => { setOpenRefreshTokenDialog(false)}, [ setOpenRefreshTokenDialog ])

    useEffect(() => {
        if(pathname !== pathnameRef.current) {
            pathnameRef.current = pathname;

            if([ '/login' ].includes(pathname) && user !== null) {
                router.push("/")
            }else if(!isLogged && (![ '/login', '/signup' ].includes(pathname))) {
                router.push("/login")
            }
        }
    }, [ isLogged, pathname, router, user ]);

    useEffect(() => {
        if(isLogged) { //[ '/login', '/signup' ].includes(pathname)
            if(rootRef.current !== null) {
                rootRef.current.classList.remove("remove-root-padding")
            }
        } 

        if(!isLogged){
            if(rootRef.current !== null) {
                rootRef.current.classList.add("remove-root-padding")
            }
        }
    }, [ isLogged ])

    useEffect(() => {
        if([ ].includes(tab)) {
            rootRef.current.classList.add("remove-root-bg")
        } else {
            rootRef.current.classList.remove("remove-root-bg")
        }
    }, [ tab ])

    //if(!isLogged) return <></>;

    return (
        <>
            <LinearProgress className={classNames({ "hidden": !isLoading }, `fixed top-0 left-0 w-full z-10`)} />
            <Collapse in={ hasError }>
                <Alert className={classNames("flex items-center py-6 px-5 md:px-[10%]")} severity="error">
                    <div className="flex items-center text-lg">
                        <AlertTitle className="mr-3 my-0 text-2xl">Error</AlertTitle>
                        { errorMessage }
                    </div>
                </Alert>
            </Collapse>
            <div id="root" ref={rootRef}>
                    { children }
                    { ![ '/login', '/signup' ].includes(pathname) && <Footer />}
            </div>
            <Dialog
                open={openRefreshTokenDialog && ![ '/login', '/signup' ].includes(pathname)}
                onClose={closeDialog}
                aria-describedby="session-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="session-dialog-description">
                        Your session will expire in 5 minutes, do you want to keep logged in?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="pb-4">
                    <Button 
                        variant="contained"
                        type="button"
                        className={classNames(globalStyles.deleteFeedbackButton, 
                        globalStyles.button, 'capitalize hover:opacity-80')}
                        onClick={closeDialog}>
                        Close dialog
                    </Button> 
                    <Button 
                        variant="contained"
                        type="button"
                        className={classNames("capitalize sm:mr-4", globalStyles.cancelFeedbackButton, 
                        globalStyles.button)}
                        onClick={revalidateToken}>
                        Stay logged in
                    </Button>    
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Container;