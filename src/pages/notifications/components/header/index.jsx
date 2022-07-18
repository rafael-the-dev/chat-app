import Link from "next/link"
import { Typography } from "@mui/material"

const Header = ({ author, commentId, post, replyId, type }) => {
    const length = post.likes.length;

    const getComment = () => {
        return post.comments.find(comment => comment.ID === commentId);
    };

    const getCommentReply = () => {
        return getComment().replies.find(reply => reply.ID === replyId)
    };

    const actionsMessage = () => {
        switch(type) {
            case "COMMENT_REPLY": {
                const size = getCommentReply().likes.length;
                return `and ${size} other${size > 1 ? "s" : ""} replied your comment`
            }
            case "COMMENT": {
                const size = post.comments.length;
                return `and ${size} other${size > 1 ? "s" : ""} commented on your post`
            }
            case "LIKE_COMMENT": {
                const size = getComment().likes.length;
                return `and ${size} other${size > 1 ? "s" : ""} liked your comment`
            }
            case "LIKE_COMMENT_REPLY": {
                const size = getCommentReply().likes.length;
                return `and ${size} other${size > 1 ? "s" : ""} liked your comment`
            }
            default: {
                return `${ post.likes.length } other${ length > 1 ? "s" : ""} liked your post`
            }
        }
    };

    return (
        <div>
            <Typography
                component="h2">
                <Link href={`profile?username=${author.username}`}>
                    <a className="font-bold mr-1">{ author.name }</a>
                </Link>
                and { actionsMessage() }
            </Typography>
        </div>
    );
};

export default Header;