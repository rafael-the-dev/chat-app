import { Alert, Button, Dialog, DialogContent, Typography } from "@mui/material"
import { useContext, useEffect, useRef, useState } from 'react'
import classNames from "classnames";

import { closeAlert, openAlert } from "src/helpers/alert"
import classes from "./styles.module.css"
import { AppContext } from "src/context";

import Checkbox from "../checkbox"
import SendButton from "../send-button"

const DialogContainer = ({ group, open, toggleDialog }) => {
    const { getFriendshipsList } = useContext(AppContext);

    const [ list, setList ] = useState([]);
    const targetList = useRef([]);

    const successAlert = useRef(null);
    const errorAlert = useRef(null);

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
                    Message forwarded!
                </Alert>
                <Alert 
                    className="h-0 opacity-0" 
                    color="error"
                    ref={errorAlert} 
                    severity="error" 
                    onClose={closeAlert(errorAlert)}>
                    Message not forwarded!
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
                                            key={friend.username} 
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
                            <SendButton disabled={list.length === 0} list={targetList} />
                        </div>
                    </fieldset>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogContainer;