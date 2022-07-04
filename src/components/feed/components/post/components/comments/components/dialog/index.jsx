import { Alert, Button, Dialog, DialogActions, DialogContent, Hidden, IconButton } from "@mui/material"
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
import classNames from "classnames"

import CommentForm from "../../../form"
import DialogHeader from "../dialog-header"


const Container = ({ handleOpenRef }) => {
    const [ open, setOpen ] = useState(false);

    const handleClose = useCallback(() => setOpen(false), []);

    useEffect(() => {
        handleOpenRef.current = () => setOpen(true);
    }, [ handleOpenRef ])

    return (
        <Dialog
            classes={{ paper: classNames("px-0 md:min-w-[450px] dark:bg-stone-500") }}
            open={open}
            onClose={handleClose}
            aria-describedby="session-dialog-description"
        >
            <div>
                <Hidden mdDown></Hidden>
                <div>
                    <DialogHeader onClose={handleClose} />
                    <CommentForm />
                </div>
            </div>
        </Dialog>
    );
};

export default Container;