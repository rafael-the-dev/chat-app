import { Hidden } from "@mui/material"
import { useCallback, useEffect, useId, useMemo, useRef, useState, useTransition } from "react"
import classNames from "classnames"
import { useRouter } from "next/router"

import classes from "./styles.module.css"

import CommentForm from "../../../form"
import DialogHeader from "./components/dialog-header"
import Comment from "./components/comment-card"
import Likes from "../../../likes"
import Dialog from "src/components/dialog"

const Container = ({ author, comments, handleOpenRef, ID, likes }) => {
    const closeHandler = useRef(null);

    const handleClose = useCallback(() => closeHandler.current?.(), []);
    
    return (
        <Dialog
            closeHandler={closeHandler}
            dialogPaper={classNames(classes.paper, "px-0 md:min-w-[450px] dark:bg-stone-500")}
            openHandler={handleOpenRef}
        >
            <div>
                <Hidden mdDown></Hidden>
                <div className={classes.dialogContent}>
                    <DialogHeader author={author} onClose={handleClose} />
                    <div className="pt-4">
                        <ul className={classNames(classes.dialogList, "overflow-y-auto px-4")}>
                            {
                                comments.map(comment => <Comment { ...comment } key={comment.ID}  onClose={handleClose} postID={ID} />)
                            }
                        </ul>
                    </div>
                    <div className="mt-3">
                        <Likes likes={likes} />
                    </div>
                    <CommentForm ID={ID} />
                </div>
            </div>
        </Dialog>
    );
};

export default Container;