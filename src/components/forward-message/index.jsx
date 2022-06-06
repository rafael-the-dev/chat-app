import { Avatar, Alert, Button, Dialog, DialogContent, FormControl, FormControlLabel, FormLabel,
    MenuItem, RadioGroup, Radio, Typography, TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useContext, useMemo, useRef, useState } from "react";

import CircleIcon from '@mui/icons-material/Circle';
import { getInitialsNameLetters } from "src/helpers"
import classNames from "classnames";
import classes from "./styles.module.css"

import { AppContext } from "src/context/AppContext"
import { ChatContext, ForwardMessage } from "src/context"
import { useMutation } from "@apollo/client";
import { SEND_DIRECT_MESSAGE, SEND_GROUP_MESSAGE } from "src/graphql/mutations";

const ForwardMessageContainer = () => {
    const { groups } = useContext(ChatContext);
    const { getFriendshipsList, getGroupsList } = useContext(AppContext);
    const { forwardDetails, messageVariables, openForwardMessageDialog, setOpenForwardMessageDialog } = useContext(ForwardMessage);

    
    const sendDirectMessageMutation = useMutation(SEND_DIRECT_MESSAGE);
    const sendGroupMessageMutation = useMutation(SEND_GROUP_MESSAGE);

    const [ receiver, setReceiver ] = useState('');
    const [ receiverType, setReceiverType ] = useState('CONTACT');
    const [ isLoading, setIsLoading ] = useState(false);

    const successAlert = useRef(null);
    const errorAlert = useRef(null);

    const closeDialog = useCallback(() => setOpenForwardMessageDialog(false), [ setOpenForwardMessageDialog ])

    const radioChangeHandler = useCallback(event => {
        setReceiverType(event.target.value);
        setReceiver('');
    }, [])

    const onChangeHandler = useCallback(event => {
        setReceiver(event.target.value);
    }, []);

    const isValidElement = useCallback((element) => {
        return (Boolean(element) && Boolean(element.current));
    }, [])

    const openAlert = useCallback(element => () => {
        if(isValidElement(element)) {
            element.current.classList.add("h-auto", "mb-2");
            element.current.classList.remove("h-0", "opacity-0")
        }
    }, [ isValidElement ]);

    const closeAlert = useCallback(element => () => {
        if(isValidElement(element)) {
            element.current.classList.remove("h-auto", "mb-2")
            element.current.classList.add("h-0", "opacity-0")
        }
    }, [ isValidElement ]);

    const sendMessageHelper = useCallback(({ properties, sendMessage }) => {
        closeAlert(successAlert)();
        closeAlert(errorAlert)();
        setIsLoading(true);

        sendMessage({ variables: {
            messageInput: { ...properties } },
            onCompleted(data) {
                openAlert(successAlert)()
                setIsLoading(false);
            },
            onError(err) {
                closeAlert(successAlert)();
                openAlert(errorAlert)();
                setIsLoading(false);
            }
        })
    }, [ closeAlert, openAlert ])

    const sendDirectMessage = useCallback(() => {
        const sendMessage = sendDirectMessageMutation[0];
        sendMessageHelper({ properties: { ...messageVariables.current, destinatary: receiver }, sendMessage });
    }, [ messageVariables, receiver, sendDirectMessageMutation, sendMessageHelper ]);

    const sendGroupMessage = useCallback(() => {
        const sendMessage = sendGroupMessageMutation[0];
        
        const properties = { 
            groupID: receiver,
            image: messageVariables.current.image,
            isForwarded: messageVariables.current.isForwarded,
            reply: messageVariables.current.reply,
            text: messageVariables.current.text
        };
        
        sendMessageHelper({ properties, sendMessage });
    }, [ messageVariables, receiver, sendMessageHelper, sendGroupMessageMutation ])

    const sendHandler = useCallback(event => {
        event.preventDefault();

        if(receiverType === "CONTACT") {
            sendDirectMessage();
        } else {
            sendGroupMessage();
        }
    }, [ receiverType, sendDirectMessage, sendGroupMessage ])
    
    const contactListMemo = useMemo(() => {
        return getFriendshipsList()
            .filter(contact => contact.username !== forwardDetails.directContact)
            .map((contact, index) => (
                <MenuItem key={contact.username} className="" value={contact.username} >
                    <div className={classNames("flex items-center w-full")}>
                        <Avatar 
                            className="h-[25px] text-base w-[25px]"
                            src={contact.image ? `http://localhost:5000/${contact.image}` : ""}>
                            { contact.image ? "" :getInitialsNameLetters(contact.name) }
                        </Avatar>
                        <Typography 
                            className={classNames("font-semibold grow ml-3 max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                            component="h2">
                            { contact.name }
                        </Typography>
                        <CircleIcon className={classNames("text-[.5rem]", contact.isOnline ? "text-green-500" : "text-red-500")} />
                    </div>
                </MenuItem>
            )
        );
    }, [ forwardDetails, getFriendshipsList ]);

    const groupsListMemo = useMemo(() => {
        return groups
            .filter(group => group.ID !== forwardDetails.group)
            .map(group => (
                <MenuItem key={group.ID} className="" value={group.ID} >
                    <div className={classNames("flex items-center w-full")}>
                        <Avatar 
                            className="h-[25px] text-base w-[25px]"
                            src={group.image ? `http://localhost:5000/${group.image}` : ""}>
                            { group.image ? "" :getInitialsNameLetters(group.name) }
                        </Avatar>
                        <Typography 
                            className={classNames("font-semibold grow ml-3 max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                            component="h2">
                            { group.name }
                        </Typography>
                    </div>
                </MenuItem>
            )
        );
    }, [ forwardDetails, groups ]);

    return (
        <Dialog
            aria-describedby="session-dialog-description"
            classes={{ paper: classes.dialogPaper }}
            open={openForwardMessageDialog}
            onClose={closeDialog}
        >
            <DialogContent>
                <Alert className="h-0 opacity-0" ref={successAlert} severity="success" color="info" 
                    onClose={closeAlert(successAlert)}>
                    Message forwarded!
                </Alert>
                <Alert className="h-0 opacity-0" color="error"ref={errorAlert} severity="error" 
                    onClose={closeAlert(errorAlert)}>
                    Message not forwarded!
                </Alert>
                <FormControl fullWidth component="fieldset" 
                    className={classNames("flex items-center")}>
                    <FormLabel component="legend" className={classNames("font-bold w-auto")}>Forward to a</FormLabel>
                    <RadioGroup className="w-full" row aria-label="type of receiver" name="receiver" 
                        defaultValue="top" value={receiverType}  onChange={radioChangeHandler}>
                        <FormControlLabel
                            value="CONTACT"
                            control={<Radio color="primary" />}
                            label="Contact"
                            labelPlacement="start"
                            className={classNames("ml-0")}
                        />
                        <FormControlLabel
                            value="GROUP"
                            control={<Radio color="primary" />}
                            label="Group"
                            labelPlacement="start"
                        />
                    </RadioGroup>
                </FormControl>
                <TextField
                    className="mt-4"
                    id="outlined-required"
                    label="Select a receiver"
                    required
                    variant="outlined"
                    select
                    value={receiver}
                    onChange={onChangeHandler}
                    fullWidth
                >{ receiverType === 'CONTACT' ? contactListMemo : groupsListMemo }
                </TextField>
                <div className="flex justify-end mt-4">
                    <Button 
                        variant="contained"
                        type="button"
                        className={classNames(`bg-transparent border border-solid border-red-500 text-red-500 
                        shadow-none hover:bg-red-500 capitalize hover:text-slate-100 hover:opacity-80`)}
                        onClick={closeDialog}>
                        Cancel
                    </Button> 
                    <Button 
                        variant="contained"
                        type=""
                        className={classNames("capitalize ml-4 px-6 hover:opacity-70")}
                        onClick={sendHandler}>
                        { isLoading ? <CircularProgress className="text-slate-100" size={25} /> : "Send" }
                    </Button>   
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ForwardMessageContainer;