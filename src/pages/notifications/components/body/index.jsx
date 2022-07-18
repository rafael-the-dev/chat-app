import { Typography } from "@mui/material"
import classNames from "classnames"

import classes from "./styles.module.css"
import Image from "src/components/image"

const Container = ({  author, commentId, post, replyId, type }) => {
    const getComment = () => {
        return post.comments.find(comment => comment.ID === commentId);
    };

    const getCommentReply = () => {
        return getComment().replies.find(reply => reply.ID === replyId)
    };

    const actionsMessage = () => {
        switch(type) {
            case "COMMENT_REPLY": {
                return getCommentReply().comment;
            }
            case "COMMENT": {
                return getComment().comment;
            }
            case "LIKE_COMMENT": {
                return getComment().comment;
            }
            case "LIKE_COMMENT_REPLY": {
                return getCommentReply().comment;
            }
            default: {
                return;
            }
        }
    };

    const value = actionsMessage();

    return (
        <div className="border border-solid border-zinc-200 mt-2 rounded-lg last:border-0 dark:border-neutral-600">
            { Boolean(value) && <div>
                <Typography 
                    component="p"
                    className={classNames(classes.comment, 
                    "overflow-hidden px-3 py-2 text-ellipsis text-base whitespace-nowrap dark:text-neutral-400")}>
                    { value }
                </Typography>
            </div> }
            <div 
                className={classNames(classes.content, `flex items-stretch`, 
                { [classes.contentWithValue]: Boolean(value) },
                { "border-t border-zinc-200 border-solid dark:border-neutral-600": Boolean(value)})}>
                <Image 
                    alt={post.description}
                    url={post.image}
                />
                <div 
                    className={classNames("flex grow items-center px-2 rounded-br-lg", 
                    { "bg-gray-50 dark:bg-gray-600": Boolean(value) })}>
                    <Typography 
                        className={classNames(classes.description, 
                        "overflow-hidden text-sm text-ellipsis whitespace-nowrap dark:text-neutral-400")}
                        component="p">
                        { post.description }
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Container;