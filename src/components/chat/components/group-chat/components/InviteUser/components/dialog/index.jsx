import { Alert, Button, Dialog, DialogContent, Typography } from "@mui/material"
import { useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import classNames from "classnames";
import { useMutation } from "@apollo/client"

import { closeAlert, openAlert } from "src/helpers/alert"
import classes from "./styles.module.css"
import { AppContext } from "src/context";

import Checkbox from "../checkbox"
import SendButton from "../send-button"

import { SEND_GROUP_INVITATION } from "src/graphql/mutations"

const DialogContainer = ({ group, open, toggleDialog }) => {
    const { getFriendshipsList } = useContext(AppContext);

    const sendMutation = useMutation(SEND_GROUP_INVITATION);

    const id = useRef(1);

    const [ list, setList ] = useState([]);
    const targetList = useRef([]);

    const successAlert = useRef(null);
    const errorAlert = useRef(null);

    const sendHelper = useCallback(({ groupInvitation, errorCallback, successCallback }) => {
        const send = sendMutation[0];

        send({
            variables: {
                groupInvitation
            },
            onCompleted() {
                openAlert(successAlert)();
                id.current = id.current + 1;
                setList([]);
                if(successCallback) {
                    successCallback()
                }
            },
            onError(error) {
                openAlert(errorAlert)();
                if(errorCallback) {
                    errorCallback()
                }
                console.log(error);
            }
        })
    }, [ sendMutation ])

    const sendHandler = useCallback(({ errorCallback, successCallback }) => {
        
        closeAlert(errorAlert)();
        closeAlert(successAlert)();

        targetList.current.forEach(async target => {
            await sendHelper({ 
                errorCallback, 
                groupInvitation: {
                    groupID: group.ID,
                    target
                },
                successCallback
            })
        })
    }, [ group, sendHelper ])

    useEffect(() => { targetList.current = list }, [ list ]);

    return (
        <Dialog
            aria-describedby="session-dialog-description"
            classes={{ paper: classes.dialogPaper }}
            open={open}
            onClose={toggleDialog(false)}
        >
            <DialogContent>
                <Alert 
                    className="h-0 opacity-0"
                    color="info" 
                    ref={successAlert} 
                    severity="success"  
                    onClose={closeAlert(successAlert)}>
                    Invitation sent!
                </Alert>
                <Alert 
                    className="h-0 opacity-0" 
                    color="error"
                    ref={errorAlert} 
                    severity="error" 
                    onClose={closeAlert(errorAlert)}>
                    Invitation not sent!
                </Alert>
                <form>
                    <fieldset>
                        <Typography 
                            className="font-bold mb-4 text-xl"
                            component="legend"
                            >
                            Invite friends to { group.name } group
                        </Typography>
                        <div>
                            {
                                getFriendshipsList()
                                    .filter(friend => !group.members.includes(friend.username))
                                    .map(friend => (
                                        <Checkbox  
                                            { ...friend } 
                                            key={`${id.current}-${friend.username}`} 
                                            list={list}
                                            setList={setList}
                                        />)
                                    )
                            }
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button 
                                variant="contained"
                                type="button"
                                className={classNames(`bg-transparent border border-solid border-red-500 text-red-500 
                                shadow-none hover:bg-red-500 capitalize hover:text-slate-100 hover:opacity-80`)}
                                onClick={toggleDialog(false)}>
                                Cancel
                            </Button> 
                            <SendButton disabled={list.length === 0} handler={sendHandler} />
                        </div>
                    </fieldset>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogContainer;