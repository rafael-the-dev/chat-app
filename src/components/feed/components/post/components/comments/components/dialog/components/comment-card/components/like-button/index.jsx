import { IconButton } from "@mui/material"
import { useCallback, useContext, useMemo, useState } from "react"
import { useMutation } from "@apollo/client"

import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { LoginContext } from "src/context"
import { hasLiked } from "src/helpers/user"
import { LIKE_COMMENT } from "src/graphql/mutations"

const Button = ({ commentID, id, likes }) => {
    const likeCommentMutation = useMutation(LIKE_COMMENT);

    const [ loading, setLoading ] = useState(false)

    const { loggedUser } = useContext(LoginContext)
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

    const likeIcon = useMemo(() => hasLike ? <FavoriteIcon className="text-red-500" /> : <FavoriteBorderIcon className="hover:text-red-500" />, [ hasLike ])
    
    return (
        <IconButton
            className="p-0 text-xs hover:bg-transparent"
            onClick={hasLike ? () => {} : likeHandler }>
            { loading ? <CircularProgress className="" size={16} /> : likeIcon }
        </IconButton>
    );
};

export default Button;