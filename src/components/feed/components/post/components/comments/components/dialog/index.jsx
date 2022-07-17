import { Hidden } from "@mui/material"
import { useCallback, useEffect, useMemo, useRef } from "react"
import classNames from "classnames"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"

import classes from "./styles.module.css"
import { GET_POST } from "src/graphql/queries"

import CommentForm from "../../../form"
import DialogHeader from "./components/dialog-header"
import Comment from "./components/comment-card"
import Likes from "../../../likes"
import Dialog from "src/components/dialog"

const Container = () => {
    const router = useRouter();
    const { pathname } = router;
    const { id, username } = router.query;

    const { data } = useQuery(GET_POST, { variables: { id }});

    const postDetails = useMemo(() => {
        if(data) {
            return data.post;
        }

        return { author: "", comments: [], ID: "", likes: [] };
    }, [ data ])

    const { author, comments, ID, likes } = postDetails;
    const handleOpenRef = useRef(null);
    const closeHandler = useRef(null);

    const handleClose = useCallback(() => {
        router.push(`${pathname}${username ? `?username=${username}`: ""}`);
    }, [ pathname, router, username ]);

    useEffect(() => {
        handleOpenRef.current?.();
    }, [])
    
    return (
        <Dialog
            closeHandler={closeHandler}
            customClose={handleClose}
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