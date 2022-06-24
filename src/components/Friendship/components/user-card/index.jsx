import { Alert, Avatar, Chip, IconButton, Typography } from "@mui/material";
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { AppContext, LoginContext } from "src/context";
import classNames from 'classnames'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import classes from './styles.module.css'
import { useMutation} from "@apollo/client"
import CircularProgress from '@mui/material/CircularProgress';

import Input from "./components/input"

import { closeAlert, openAlert } from "src/helpers/alert"
import { SEND_FRIENDSHIP_INVITATION } from "src/graphql/mutations"
import { GET_LOGGED_USER_DETAILS } from "src/graphql/queries"

const Container = ({ image, name, username }) => {
    const sendInvitationMutation = useMutation(SEND_FRIENDSHIP_INVITATION, { refetchQueries: [ GET_LOGGED_USER_DETAILS ]});

    const { getFriendshipInvitationsList, getInitialsNameLetters, getBgColors } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext)
    const [ states, setStates ] = useState({ expanded: false, isLoading: false, open: false })
    const { expanded, isLoading, open } = states;

    const successAlert = useRef(null);
    const errorAlert = useRef(null);
    const valueRef = useRef("");

    const toggleDialog = useCallback(prop => () => setStates(props => ({ ...props, open: prop })), []);
    const toggleExpand = useCallback(() => setStates(props => ({ ...props, expanded: !props.expanded })), []);

    const input = useMemo(() => <Input valueRef={valueRef} />, []);

    const hasInvitationSent = useMemo(() => {
        return getFriendshipInvitationsList().find(invitation => {
            const filters = [ username, loggedUser.username ];
            return filters.includes(invitation.sender.username) && filters.includes(invitation.target.username);
        })
    }, [ getFriendshipInvitationsList, loggedUser, username ])

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
    }, [ sendInvitationMutation, username ])
    
    return (
        <li className={classNames(classes.card, `flex items-center py-2 last:border-0`)}>
            <Avatar 
                imgProps={{ loading: "lazy" }}
                src={image ? `http://localhost:5000/${image}` : ""}
                style={{ backgroundColor: image ? "transparent" : getBgColors()[username] }} 
                className="text-base">
                { image ? "" :getInitialsNameLetters(name) }
            </Avatar>
            <div className="flex flex-col grow ml-3">
                <Typography 
                    className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                    component="h2">
                    { name }
                </Typography>
                <Typography className={classNames("mt-1")}>
                    @{ username }
                </Typography>
            </div>
            {
                hasInvitationSent ? (
                    <Chip color="primary" label="pending" variant="outlined" />
                ) : (
                    <IconButton 
                        className="ml-3"
                        onClick={toggleDialog(true)}>
                        <PersonAddIcon className="opacity-80 text-blue-600" />
                    </IconButton>
                )
            }
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
        </li>
    );
};

export default Container;