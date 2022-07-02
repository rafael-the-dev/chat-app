import { useCallback, useContext, useMemo, useState } from "react";
import { IconButton } from "@mui/material"
import { useMutation } from "@apollo/client"

import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { LoginContext } from "src/context";
import { LIKE_POST } from "src/graphql/mutations"

const Button = ({ id, likes }) => {
    const likeMutation = useMutation(LIKE_POST);

    const { loggedUser } = useContext(LoginContext);

    const [ loading, setLoading ] = useState(false)

    const hasLiked = useMemo(() => {
        const result = likes.find(like => like.username === loggedUser.username);
        return Boolean(result)
    }, [ likes, loggedUser ]);
    //console.log(hasLiked, likes)

    const likeIcon = useMemo(() => hasLiked ? <FavoriteIcon className="text-red-500" /> : <FavoriteBorderIcon />, [ hasLiked ])

    const likeHandler = useCallback(() => {
        const like = likeMutation[0];
        setLoading(true);

        like({ 
            variables: {
                id
            },
            onCompleted() {
                setLoading(false);
            },
            onError(error) {
                console.error(error)
                setLoading(false);
            }
        })
    }, [ id, likeMutation ])

    return (
        <IconButton onClick={ hasLiked ? () => {} : likeHandler }>
            { loading ? <CircularProgress className="" size={19} /> : likeIcon }
        </IconButton>
    );
};

export default Button;