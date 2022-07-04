import { Alert, Button, Dialog, DialogActions, DialogContent, Hidden, IconButton } from "@mui/material"
import { useCallback, useEffect, useId, useMemo, useRef, useState, useTransition } from "react"
import classNames from "classnames"

import CommentForm from "../../../form"
import DialogHeader from "./components/dialog-header"
import Comment from "./components/comment-card"


const Container = ({ author, comments, handleOpenRef }) => {
    const [ open, setOpen ] = useState(false);
    const id = useId();

    const handleClose = useCallback(() => setOpen(false), []);

    useEffect(() => {
        handleOpenRef.current = () => setOpen(true);
    }, [ handleOpenRef ])
    console.log(comments)
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
                    <DialogHeader author={author} onClose={handleClose} />
                    <div className="pt-4">
                        <ul className="px-4">
                            {
                                comments.map(comment => <Comment key={comment.ID} { ...comment } />)
                            }
                        </ul>
                    </div>
                    <CommentForm />
                </div>
            </div>
        </Dialog>
    );
};

export default Container;