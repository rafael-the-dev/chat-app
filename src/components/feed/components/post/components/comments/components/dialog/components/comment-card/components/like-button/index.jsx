import { IconButton } from "@mui/material"
import { useContext, useMemo } from "react"

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { LoginContext } from "src/context"
import { hasLiked } from "src/helpers/user"

const Button = ({ likes }) => {
    const { loggedUser } = useContext(LoginContext)
    const hasLike = useMemo(() => hasLiked({ likes, username: loggedUser.username }), [ likes, loggedUser ])
    return (
        <IconButton
            className="text-xs">
            { hasLike ? <FavoriteIcon className="text-red-500" /> : <FavoriteBorderIcon />}
        </IconButton>
    );
};

export default Button;