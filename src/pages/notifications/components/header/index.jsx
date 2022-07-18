import Link from "next/link"
import { Typography } from "@mui/material"

const Header = ({ author, commentId, post, replyId, type }) => {
    const length = post.likes.length - 1;

    const getComment = () => {
        return post.comments.find(comment => comment.ID === commentId);
    };

    const getCommentReply = () => {
        return getComment().replies.find(reply => reply.ID === replyId)
    };

    const countCommentsUsernames = () => {
        const usernames = [];
        post.comments.forEach(comment => {
            if(!usernames.includes(comment.username)) usernames.push(comment.username);
        })

        return usernames.length - 1;
    };

    const countCommentRepliesUsernames = () => {
        const usernames = [];
        getComment().replies.forEach(reply => {
            if(!usernames.includes(reply.username)) usernames.push(reply.username);
        })

        return usernames.length - 1;
    };

    const actionsMessage = () => {
        switch(type) {
            case "COMMENT_REPLY": {
                const size = countCommentRepliesUsernames();
                return `${size <= 0 ? "" : `and ${size} other${size > 1 ? "s" : ""}`} replied your comment`
            }
            case "COMMENT": {
                const size =countCommentsUsernames() ;
                return `${size <= 0 ? "" : `and ${size} other${size > 1 ? "s" : ""}`} commented on your post`
            }
            case "LIKE_COMMENT": {
                const size = getComment().likes.length - 1;
                return `${size <= 0 ? "" : ` and ${size} other${size > 1 ? "s" : ""}`} liked your comment`
            }
            case "LIKE_COMMENT_REPLY": {
                const size = getCommentReply().likes.length - 1;
                return `${size <= 0 ? "" : ` and ${size} other${size > 1 ? "s" : ""}`} liked your comment`
            }
            default: {
                return `${length <= 0 ? "" : `and ${ length } other${ length > 1 ? "s" : ""}`} liked your post`
            }
        }
    };

    return (
        <header>
            <Typography
                component="h2"
                className="dark:text-zinc-500">
                <Link href={`profile?username=${author.username}`}>
                    <a className="font-bold mr-1 text-black dark:text-zinc-400">{ author.name }</a>
                </Link>
                { actionsMessage() }
            </Typography>
        </header>
    );
};

export default Header;