import { Alert, Dialog, DialogContent, IconButton } from "@mui/material"
import { useCallback, useRef, useState } from 'react'

import GroupAddIcon from '@mui/icons-material/GroupAdd';

import classes from "./styles.module.css"


const InviteUser = () => {
    const [ open, setOpen ] = useState(false);
    const successAlert = useRef(null);
    const errorAlert = useRef(null);


    const toggleDialog = useCallback(prop => () => setOpen(prop), [ setOpen ])

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

    return (
        <>
            <IconButton onClick={toggleDialog(true)}>
                <GroupAddIcon className="text-slate-100" />
            </IconButton>
            <Dialog
                aria-describedby="session-dialog-description"
                classes={{ paper: classes.dialogPaper }}
                open={open}
                onClose={toggleDialog(false)}
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

                </DialogContent>
            </Dialog>
        </>
    );
};

export default InviteUser;