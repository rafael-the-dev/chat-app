import { Alert, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import classNames from "classnames"
import { useMutation} from "@apollo/client"
import CircularProgress from '@mui/material/CircularProgress';

import { closeAlert, openAlert } from "src/helpers/alert"

import Input from "../input"
import { SEND_FRIENDSHIP_INVITATION } from "src/graphql/mutations"

const InvitationDialog = ({ name, openDialog, username }) => {
    const sendInvitationMutation = useMutation(SEND_FRIENDSHIP_INVITATION);

    const [ states, setStates ] = useState({ expanded: false, isLoading: false, open: false })
    const { expanded, isLoading, open } = states;

    const successAlert = useRef(null);
    const errorAlert = useRef(null);
    const valueRef = useRef("");

    const input = useMemo(() => <Input valueRef={valueRef} />, []);

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
                console.log(err);
                openAlert(errorAlert)();
                setStates(props => ({ ...props, isLoading: false, expanded: false }))
            }
        })
    }, [ sendInvitationMutation, username ]);

    useEffect(() => {
        openDialog.current = toggleDialog(true);
    }, [ openDialog, toggleDialog ]);

    return (
        <Dialog
            open={open}
            onClose={toggleDialog(false)}
            aria-labelledby="friendship-invitation-dialog-title"
            aria-describedby="friendship-invitation-dialog-description"
        >
            <DialogTitle id="friendship-invitation-dialog-title">
                Invite { name }
            </DialogTitle>
            <DialogContent id="friendship-invitation-dialog-description">
                <Alert 
                    className="hidden mb-3" 
                    color="error"
                    ref={errorAlert} 
                    severity="error" 
                    onClose={closeAlert(errorAlert)}>
                    Invitation to { name } not sent!
                </Alert>
                <Alert 
                    className="hidden mb-3"
                    color="info" 
                    ref={successAlert} 
                    severity="success"  
                    onClose={closeAlert(successAlert)}
                >
                    { name } was successfully invited!
                </Alert>
                <DialogContentText id="session-dialog-description">
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
                    variant="contained"
                    type="button"
                    className={classNames("capitalize ml-2 sm:mr-4 hover:bg-red-500", )}
                    onClick={sendInvitationHandler}>
                    { isLoading ? <CircularProgress className="text-white" size={22} /> : "Send" }
                </Button>    
            </DialogActions>
        </Dialog>
    );
};

export default InvitationDialog;