import { Button, Dialog, DialogContent, Typography } from "@mui/material"
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import classNames from "classnames";
import { useMutation } from "@apollo/client"

import classes from "./styles.module.css"
import { AppContext } from "src/context";

import Checkbox from "../checkbox"
import SendButton from "../send-button"

import { SEND_GROUP_INVITATION } from "src/graphql/mutations"
import Alert from "../feedback-alert"

const DialogContainer = ({ group, open, toggleDialog }) => {
    const { getFriendshipsList } = useContext(AppContext);

    const sendMutation = useMutation(SEND_GROUP_INVITATION);

    const id = useRef(1);

    const [ list, setList ] = useState([]);
    const [ alerts, setAlerts ] = useState([]);
    const targetList = useRef([]);

    const listLength = useRef(0);
    const alertsList = useRef([]);
    const alertCounter = useRef(0);

    const sendHelper = useCallback(async ({ errorCallback, groupInvitation, index, successCallback }) => {
        const send = sendMutation[0];
        const alertID = `${alertCounter.current}-${groupInvitation.target}`;

        const updateList = () => {
            if((index + 1) === listLength.current) {
                if(errorCallback) {
                    errorCallback()
                }
                id.current = id.current + 1;
                setAlerts(alertsList.current)
                setList([]);
            }
        }

        return new Promise((resolve, reject) => {
            send({
                variables: {
                    groupInvitation
                },
                onCompleted() {
                    alertsList.current.push(<Alert key={alertID} target={groupInvitation.target} />)
                    updateList()
                    resolve();
                },
                onError(error) {
                    alertsList.current.push(<Alert hasError key={alertID} target={groupInvitation.target} />);
                    updateList()
                    reject(error);
                }
            })

        });
    }, [ sendMutation ])

    const sendHandler = useCallback(async ({ errorCallback, successCallback }) => {
        listLength.current = targetList.current.length;
        alertCounter.current = alertCounter.current + 1;
        alertsList.current = [];

        for(let i = 0; i < targetList.current.length; i++) {
            const target = targetList.current[i];

            try {
                await sendHelper({ 
                    errorCallback, 
                    groupInvitation: {
                        groupID: group.ID,
                        target
                    },
                    index: i,
                    successCallback
                })
            } catch(error) {
                console.error(error)
            }
        }
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
                { alerts }
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