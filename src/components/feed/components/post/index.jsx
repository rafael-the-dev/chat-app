import { useCallback, useContext, useMemo } from "react";
import Image from "next/image"
import { Avatar, CardMedia, IconButton, Paper, Typography } from "@mui/material"
import classNames from "classnames"

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons'

import { AppContext, LoginContext } from "src/context"
import { getDate } from "src/helpers"

import LikeButton from "./components/like-button"
import Options from "./components/options"

library.add(faComment);

const Post = ({ author, createdAt, description, ID, image, likes }) => {

    const { getUsersList, serverPublicURL } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext)

    const authorDetails = useMemo(() => {
        const result = getUsersList().find(user => user.username === author);

        if(result) return result;

        return { image: "", name: ""};
    }, [ author, getUsersList ])

    const myLoader = ({ src }) => `${serverPublicURL.current}/${image}`;

    return (
        <Paper 
            className="flex flex-col items-stretch mb-4 px-4 py-3 rounded-xl w-full last:mb-0"
            elevation={0}>
            <header className="flex items-center justify-between">
                <div className="flex items-center">
                    <Avatar 
                        alt={authorDetails.name}
                        className="h-[30px] w-[30px]"
                        src={`${serverPublicURL.current}/${authorDetails.image}`}
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
                            { getDate(new Date(parseInt(createdAt))) }
                        </Typography>
                    </div>
                </div>
                <Options author={author} ID={ID} />
            </header>
            { image && <div className="mt-3 relative w-full">
                <CardMedia
                    className="h-auto"
                    component="img"
                    height="194"
                    image={`${serverPublicURL.current}/${image}`}
                    alt="Paella dish"
                />
                {/*<Image h-[300px] 
                    alt={description}
                    className="object-contain"
                    loader={myLoader}
                    layout="fill"
                    src={`${serverPublicURL.current}/${image}`}
                />*/}
            </div>}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <LikeButton id={ID} likes={likes} />
                    <IconButton className="">
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
            { description && (
                <Typography 
                    className="px-3 text-slate-600"
                    component="p">
                    { description }
                </Typography>
            )}
        </Paper>
    );
};

export default Post;