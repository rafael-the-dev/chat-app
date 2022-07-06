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
import { DISLIKE_COMMENT, LIKE_COMMENT } from "src/graphql/mutations"

const Button = ({ commentID, id, likes, smallIcon }) => {
    const likeCommentMutation = useMutation(LIKE_COMMENT);
    const dislikeCommentMutation = useMutation(DISLIKE_COMMENT);

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

    const likeIcon = useMemo(() => hasLike ? <FavoriteIcon className={classNames(customClasses, "text-red-500")} /> : <FavoriteBorderIcon className={classNames(customClasses, "hover:text-red-500")} />, [ hasLike ])
    
    return (
        <IconButton
            className="p-0  hover:bg-transparent"
            onClick={hasLike ? dislikeHandler : likeHandler }>
            { loading ? <CircularProgress className="" size={16} /> : likeIcon }
        </IconButton>
    );
};

export default Button;