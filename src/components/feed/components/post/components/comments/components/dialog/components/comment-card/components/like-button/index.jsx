import { IconButton } from "@mui/material"
import { useCallback, useContext, useMemo, useState } from "react"
import { useMutation } from "@apollo/client"
import classNames from "classnames"

import classes from "./styles.module.css"

import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { LoginContext } from "src/context"
import { hasLiked } from "src/helpers/user"
import { DISLIKE_COMMENT, DISLIKE_COMMENT_REPLY, LIKE_COMMENT, LIKE_COMMENT_REPLY } from "src/graphql/mutations"

const Button = ({ commentID, id, likes, replyID, smallIcon }) => {
    const dislikeCommentMutation = useMutation(DISLIKE_COMMENT);
    const dislikeCommentReplyMutation = useMutation(DISLIKE_COMMENT_REPLY);
    const likeCommentMutation = useMutation(LIKE_COMMENT);
    const likeCommentReplyMutation = useMutation(LIKE_COMMENT_REPLY);
    console.log(likes)
    const [ loading, setLoading ] = useState(false)

    const { loggedUser } = useContext(LoginContext)

    const customClasses = useMemo(() => {
        if(smallIcon) return classes.smallIcon;

        return "";
    }, [ smallIcon ]);

    const hasLike = useMemo(() => hasLiked({ likes, username: loggedUser.username }), [ likes, loggedUser ]);
    

    const responseHandler = useMemo(() => (
        {
            onCompleted: () => {
                setLoading(false);
            },
            onError: (error) => {
                console.error(error)
                setLoading(false);
            }
        }
    ), []);

    const dislikeHandler = useCallback(() => {
        setLoading(true);
        const dislike = dislikeCommentMutation[0];

        dislike({
            ...responseHandler,
            variables: {
                commentID,
                id
            }
        })
    }, [ commentID, id, dislikeCommentMutation, responseHandler ])

    const likeHandler = useCallback(() => {
        setLoading(true);
        const like = likeCommentMutation[0];

        like({
            ...responseHandler,
            variables: {
                commentID,
                id
            }
        })
    }, [ commentID, id, likeCommentMutation, responseHandler ])

    const dislikeCommentReplyHandler = useCallback(() => {
        setLoading(true);
        const dislike = dislikeCommentReplyMutation[0];

        dislike({
            ...responseHandler,
            variables: {
                commentID,
                id,
                replyID
            }
        })
    }, [ commentID, dislikeCommentReplyMutation, id, replyID, responseHandler ])

    const likeCommentReplyHandler = useCallback(() => {
        setLoading(true);
        const like = likeCommentReplyMutation[0];

        like({
            ...responseHandler,
            variables: {
                commentID,
                id,
                replyID
            }
        })
    }, [ commentID, id, likeCommentReplyMutation, replyID, responseHandler ])

    const likeIcon = useMemo(() => hasLike ? <FavoriteIcon className={classNames(customClasses, "text-red-500")} /> : <FavoriteBorderIcon className={classNames(customClasses, "hover:text-red-500")} />, [ hasLike ])
    
    const handler = useMemo(() => {
        if(replyID) {
            return hasLike ? dislikeCommentReplyHandler : likeCommentReplyHandler;
        }

        return hasLike ? dislikeHandler : likeHandler;
    }, [ dislikeHandler, dislikeCommentReplyHandler, hasLike, likeHandler, likeCommentReplyHandler, replyID ]);

    return (
        <IconButton
            className="p-0  hover:bg-transparent"
            onClick={handler}>
            { loading ? <CircularProgress className="" size={16} /> : likeIcon }
        </IconButton>
    );
};

export default Button;