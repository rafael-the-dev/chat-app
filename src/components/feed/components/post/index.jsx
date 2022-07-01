import { useCallback, useContext, useMemo } from "react";
import Image from "next/image"
import { Avatar, IconButton, Paper, Typography } from "@mui/material"
import classNames from "classnames"

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons'

import { AppContext } from "src/context"

library.add(faComment);

const Post = ({ author, description, image }) => {

    const { getUsersList, serverPublicURL } = useContext(AppContext);

    const authorDetails = useMemo(() => {
        const result = getUsersList().find(user => user.username === author);

        if(result) return result;

        return { image: "", name: ""};
    }, [ author, getUsersList ])

    const myLoader = ({ src }) => `${serverPublicURL.current}/${image}`;

    return (
        <Paper 
            className="flex flex-col items-stretch mb-4 pb-1 px-4 pt-3 rounded-lg w-full last:mb-0"
            elevation={0}>
            <header className="flex items-center">
                <Avatar 
                    alt={authorDetails.name}
                    className="h-[30px] w-[30px]"
                    src={authorDetails.image}
                />
                <div className=" ml-3">
                    <Typography 
                        className="font-bold text-sm"
                        component="h2">
                        { authorDetails.name }
                    </Typography>
                    <Typography 
                        className="text-xs"
                        component="p">
                        12:00 PM
                    </Typography>
                </div>
            </header>
            { image && <div className="h-[300px] relative w-full">
                <Image 
                    alt={description}
                    className="object-contain"
                    loader={myLoader}
                    layout="fill"
                    src={`${serverPublicURL.current}/${image}`}
                />
            </div>}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <IconButton>
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton className="ml-2">
                        <FontAwesomeIcon 
                            className={classNames("text-2xl")} 
                            icon="fa-solid comment fa-comment" 
                        />
                    </IconButton>
                </div>
                <IconButton>
                    <BookmarkBorderIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

export default Post;