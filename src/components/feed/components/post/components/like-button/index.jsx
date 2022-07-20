import { useCallback, useContext, useMemo, useState } from "react";
import { IconButton } from "@mui/material"
import { useMutation } from "@apollo/client"

import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { LoginContext } from "src/context";
import { DISLIKE_POST, LIKE_POST } from "src/graphql/mutations"

const Button = ({ id, likes }) => {
    const likeMutation = useMutation(LIKE_POST);
    const dislikeMutation = useMutation(DISLIKE_POST);

    const { loggedUser } = useContext(LoginContext);

    const [ loading, setLoading ] = useState(false)

    const hasLiked = useMemo(() => {
        const result = likes.find(like => like.username === loggedUser.username);
        return Boolean(result)
    }, [ likes, loggedUser ]);

    const likeIcon = useMemo(() => hasLiked ? <FavoriteIcon className="text-red-500" /> : <FavoriteBorderIcon className="dark:text-zinc-500" />, [ hasLiked ])

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
        const like = likeMutation[0];
        setLoading(true);

        like({ 
            ...responseHandler,
            variables: {
                id
            }
        })
    }, [ id, likeMutation, responseHandler ]);

    const dislikeHandler = useCallback(() => {
        const dislike = dislikeMutation[0];
        setLoading(true);

        dislike({ 
            ...responseHandler,
            variables: {
                id
            }
        })
    }, [ id, responseHandler, dislikeMutation ])

    return (
        <IconButton onClick={ hasLiked ? dislikeHandler : likeHandler }>
            { loading ? <CircularProgress className="" size={19} /> : likeIcon }
        </IconButton>
    );
};

export default Button;