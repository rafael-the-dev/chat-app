import { Alert, Button, Dialog, DialogContent, TextField, Typography } from "@mui/material"
import { useCallback, useContext, useRef, useState } from "react"
import classNames from 'classnames'

import classes from "./styles.module.css"

import { ChatContext } from "src/context"

const CreateGroupModal = () => {
    const { openCreateGroupDialog, setOpenCreateGroupDialog } = useContext(ChatContext);

    const [ groupName, setGroupName ] = useState("");
    const successAlert = useRef(null);
    const errorAlert = useRef(null);

    const closeDialog = useCallback(() => setOpenCreateGroupDialog(false), [ setOpenCreateGroupDialog ]);

    const isValidElement = useCallback((element) => {
        return (Boolean(element) && Boolean(element.current));
    }, []);

    const openAlert = useCallback(element => () => {
        if(isValidElement(element)) {
            element.current.classList.add("h-auto", "mb-2");
            element.current.classList.remove("h-0", "opacity-0", "p-0")
        }
    }, [ isValidElement ]);

    const closeAlert = useCallback(element => () => {
        if(isValidElement(element)) {
            element.current.classList.remove("h-auto", "mb-2")
            element.current.classList.add("h-0", "opacity-0", "p-0")
        }
    }, [ isValidElement ]);

    const nameChangeHandler = useCallback(event => setGroupName(event.target.value), [])

    const createGroup = useCallback(() => {
        //openAlert(errorAlert)()
    }, [  ])

    return (
        <Dialog
            aria-describedby="session-dialog-description"
            classes={{ paper: classNames("", classes.dialogPaper) }}
            open={openCreateGroupDialog}
            onClose={closeDialog}
        >
            <DialogContent>
                <Alert className="h-0 opacity-0 p-0" ref={successAlert} severity="success" color="info" 
                    onClose={closeAlert(successAlert)}>
                    Group Created!
                </Alert>
                <Alert className="h-0 opacity-0 p-0" color="error"ref={errorAlert} severity="error" 
                    onClose={closeAlert(errorAlert)}>
                    Error while creating group!
                </Alert>
                <form>
                    <fieldset>
                        <Typography
                            className="font-bold mb-3 text-2xl "
                            component="legend">
                            Create new group
                        </Typography>
                        <TextField 
                            className="mb-3"
                            fullWidth
                            id="group-name" 
                            label="Name" 
                            onChange={nameChangeHandler}
                            required
                            variant="outlined" 
                        />
                        <TextField 
                            fullWidth
                            id="group-description" 
                            label="Description" 
                            variant="outlined" 
                        />
                    </fieldset>
                    <div className="flex justify-end mt-4">
                        <Button
                            className="border border-solid border-red-500 mr-3 text-red-500 
                            hover:bg-red-500 hover:text-slate-100"
                            onClick={closeDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="border border-solid bg-cyan-700 text-slate-100 hover:text-cyan-700 hover:bg-transparent
                            hover:border-cyan-700 px-4"
                            disabled={!Boolean(groupName)}
                            onClick={createGroup}
                        >
                            Send
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroupModal;