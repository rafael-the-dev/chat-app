import { Alert, Button, Dialog, DialogContent, TextField, Typography } from "@mui/material"
import { useCallback, useContext, useRef, useState } from "react"
import classNames from 'classnames'
import { useMutation } from "@apollo/client"

import classes from "./styles.module.css"

import { CREATE_NEW_GROUP } from "src/graphql/mutations"
import { GET_GROUPS } from "src/graphql/queries"
import { ChatContext } from "src/context"

const CreateGroupModal = () => {
    const { openCreateGroupDialog, setOpenCreateGroupDialog } = useContext(ChatContext);
    const createGroupMutation = useMutation(CREATE_NEW_GROUP, { refetchQueries: [ GET_GROUPS ]});

    const [ groupName, setGroupName ] = useState("");
    const groupNameRef = useRef("");
    const groupDescriptionRef = useRef(null);
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

    const nameChangeHandler = useCallback(event => {
        const value = event.target.value;
        groupNameRef.current = value;
        setGroupName(value);
    }, [])

    const createGroup = useCallback(() => {
        closeAlert(successAlert)();
        closeAlert(errorAlert)();

        const createGroup = createGroupMutation[0];

        createGroup({
            variables: {
                group: {
                    description: groupDescriptionRef.current.value,
                    name: groupNameRef.current
                }
            },
            onCompleted(data) {
                openAlert(successAlert)();
            },
            onError(error) {
                openAlert(errorAlert)();
                console.error(error);
            }
        })
    }, [ closeAlert, createGroupMutation, openAlert ])

    return (
        <Dialog
            aria-labelledby="dialog-title"
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
                            component="legend"
                            id="dialog-title">
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
                            inputRef={groupDescriptionRef}
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
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroupModal;