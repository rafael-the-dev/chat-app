import { useContext, useMemo } from "react";
import Image from "next/image"
import { Avatar, CardMedia, IconButton, Paper, Typography } from "@mui/material"
import classNames from "classnames"
import Link from "next/link"

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment } from '@fortawesome/free-solid-svg-icons'

import { AppContext, LoginContext } from "src/context"
import { getDate } from "src/helpers"
import { getUserDetails } from "src/helpers/user"

import Likes from "./components/likes"
import LikeButton from "./components/like-button"
import Options from "./components/options"
import Form from "./components/form"
import Comments from "./components/comments"

library.add(faComment);

const Post = ({ author, createdAt, comments, description, ID, image, likes }) => {

    const { getUsersList, serverPublicURL } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext)

    const authorDetails = useMemo(() => getUserDetails({ list: getUsersList(), username: author }), [ author, getUsersList ])

    const myLoader = ({ src }) => `${serverPublicURL.current}/${image}`;

    return (
        <Paper 
            className="flex flex-col items-stretch mb-4 px-0 pt-3 rounded-xl w-full last:mb-0"
            elevation={0}>
            <header className="flex items-center justify-between px-4">
                <div className="flex items-center">
                    <Avatar 
                        alt={authorDetails.name}
                        className="h-[30px] w-[30px]"
                        src={`${serverPublicURL.current}/${authorDetails.image}`}
                    />
                    <div className=" ml-3">
                        <Link href={`profile?username=${authorDetails.username}`}>
                            <a>
                                <Typography 
                                    className="font-bold text-black text-sm hover:text-red-500"
                                    component="h2">
                                    { authorDetails.name }
                                </Typography>
                            </a>
                        </Link>
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
                    loading= "lazy"
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
            <div className="flex items-center justify-between px-4">
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
            <Likes likes={ likes } /> 
            { description && (
                <div className=" flex px-6">
                    <Link href={`profile?username=${authorDetails.username}`}>
                        <a>
                            <Typography 
                                className="font-semibold text-black hover:text-red-500"
                                component="p">
                                { authorDetails.name }
                            </Typography>
                        </a>
                    </Link>
                    <Typography 
                        className="px-3 text-slate-600"
                        component="p">
                        { description }
                    </Typography>
                </div>
            )}
            <Comments comments={comments} />
            <Form ID={ID} />
        </Paper>
    );
};

export default Post;