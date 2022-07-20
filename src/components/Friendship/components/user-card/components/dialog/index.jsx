import { Alert, Button, Collapse, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import classNames from "classnames"
import { useMutation} from "@apollo/client"
import CircularProgress from '@mui/material/CircularProgress';
import classes from "./styles.module.css"

import { closeAlert, openAlert } from "src/helpers/alert"

import Input from "../input"
import Dialog from 'src/components/dialog'
import DialogHeader from 'src/components/dialog/components/dialog-header'

import { SEND_FRIENDSHIP_INVITATION } from "src/graphql/mutations"
import { AppContext, LoginContext } from 'src/context';

const InvitationDialog = ({ name, openDialog, username }) => {
    const sendInvitationMutation = useMutation(SEND_FRIENDSHIP_INVITATION);

    const { getFriendshipInvitationsList } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext)

    const [ states, setStates ] = useState({ expanded: false, isLoading: false, open: false })
    const { expanded, isLoading, open } = states;

    const openHandler = useRef(null);
    const closeHandler = useRef(null);
    const successAlert = useRef(null);
    const errorAlert = useRef(null);
    const valueRef = useRef("");

    const input = useMemo(() => <Input valueRef={valueRef} />, []);

    const hasInvitationSent = useMemo(() => {
        return getFriendshipInvitationsList().find(invitation => {
            const filters = [ username, loggedUser.username ];
            return filters.includes(invitation.sender.username) && filters.includes(invitation.target.username);
        })
    }, [ getFriendshipInvitationsList, loggedUser, username ]);

    const toggleDialog = useCallback(prop => () => setStates(props => ({ ...props, open: prop })), []);
    const toggleExpand = useCallback(() => setStates(props => ({ ...props, expanded: !props.expanded })), []);

    const sendInvitationHandler = useCallback(() => {
        const send = sendInvitationMutation[0];
        closeAlert(errorAlert)();
        closeAlert(successAlert)();
        setStates(props => ({ ...props, isLoading: true }))

        send({ variables: 
            {
                description: valueRef.current,
                targetUsername: username
            },
            onCompleted() {
                valueRef.current = "";
                openAlert(successAlert)();
                setStates(props => ({ ...props, isLoading: false, expanded: false }))
            },
            onError(err) {
                console.error(err);
                openAlert(errorAlert)();
                setStates(props => ({ ...props, isLoading: false, expanded: false }))
            }
        })
    }, [ sendInvitationMutation, username ]);

    useEffect(() => {
        openDialog.current = () => openHandler.current?.();
    }, [ openDialog, toggleDialog ]);

    return (
        <Dialog
            closeHandler={closeHandler}
            dialogPaper="bg-transition dark:bg-stone-500"
            openHandler={openHandler}
            ariaLabelledby="friendship-invitation-dialog-title"
            ariaDescribedby="friendship-invitation-dialog-description"
        >
            <DialogHeader 
                id="friendship-invitation-dialog-title"
                onClose={() => closeHandler.current?.()}>
                <span className="pl-6">Invite { name }</span>
            </DialogHeader>
            <DialogContent className={classes.dialogContent} id="friendship-invitation-dialog-description">
                <Alert 
                    className="hidden mb-3" 
                    color="error"
                    ref={errorAlert} 
                    severity="error" 
                    onClose={closeAlert(errorAlert)}>
                    Invitation to { name } not sent!
                </Alert>
                <Alert 
                    className="hidden mb-"
                    color="info" 
                    ref={successAlert} 
                    severity="success"  
                    onClose={closeAlert(successAlert)}
                >
                    { name } was successfully invited!
                </Alert>
                <DialogContentText 
                    className="dark:text-slate-400"
                    id="session-dialog-description">
                    You can add a description to personalize your invitation to 
                    <span className="font-bold ml-2">{username}</span>.
                </DialogContentText>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    { input }
                </Collapse>
            </DialogContent>
            <DialogActions className="pb-4">
                <Button 
                    variant="contained"
                    type="button"
                    className={classNames(`bg-transparent border border-solid border-slate-200 hover:bg-red-500
                    capitalize shadow-none text-gray-600 hover:opacity-80 hover:text-slate-200 hover:border-0`)}
                    onClick={toggleExpand}>
                    { expanded ? "cancel" : "Add a description" }
                </Button> 
                <Button 
                    className={classNames("capitalize ml-2 sm:mr-4 hover:bg-red-500", )}
                    disabled={hasInvitationSent}
                    variant="contained"
                    type="button"
                    onClick={sendInvitationHandler}>
                    { isLoading ? <CircularProgress className="text-white" size={22} /> : "Send" }
                </Button>    
            </DialogActions>
        </Dialog>
    );
};

export default InvitationDialog;