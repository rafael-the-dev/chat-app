import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import Image from "next/image"
import { Avatar, Button, CardMedia, IconButton, Paper, Typography } from "@mui/material"
import classNames from "classnames"
import Link from "next/link"
import ShowMoreText from "react-show-more-text";
import { useRouter } from "next/router"

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

/**<Link href={`profile?username=${authorDetails.username}`} passHref>
                            <Typography 
                                className="font-semibold mr-2 text-black hover:text-red-500 
                                dark:text-slate-400 text-transition"
                                component="a"
                                onClick={e => e.preventDefault()}>
                                { authorDetails.name }
                            </Typography>
                        </Link> */

const Post = ({ author, createdAt, comments, description, ID, image, likes }) => {
    const router = useRouter();
    const { getUsersList, serverPublicURL } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext)

    const authorDetails = useMemo(() => getUserDetails({ list: getUsersList(), username: author }), [ author, getUsersList ])

    const myLoader = ({ src }) => `${serverPublicURL.current}/${image}`;

    return (
        <Paper 
            className="flex flex-col items-stretch mb-4 px-0 pt-3 rounded-xl w-full last:mb-0 
            bg-transition dark:bg-stone-500"
            elevation={0}>
            <header className="flex items-center justify-between pl-4 pr-1 md:px-4">
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
                                    className="font-bold text-black text-sm hover:text-red-500 text-transition
                                    dark:text-slate-300"
                                    component="h2">
                                    { authorDetails.name }
                                </Typography>
                            </a>
                        </Link>
                        <Typography 
                            className="text-xs dark:text-slate-500"
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
            <div className="flex items-center justify-between px-2 md:px-4">
                <div className="flex items-center">
                    <LikeButton id={ID} likes={likes} />
                    <IconButton className="">
                        <FontAwesomeIcon 
                            className={classNames("text-2xl")} 
                            icon="fa-solid comment fa-comment" 
                        />
                    </IconButton>
                </div>
                <IconButton className="dark:text-zinc-500">
                    <BookmarkBorderIcon />
                </IconButton>
            </div>
            <Likes likes={ likes } /> 
            { description && (
                <div className="px-4 md:px-6">
                    <Typography  
                        className={`grow dark:text-zinc-400 text-transition`}
                        component={ShowMoreText}
                            lines={2}
                            more='Read more'
                            less='Read less'
                            anchorClass='my-anchor-css-class'
                            expanded={false}
                        >
                        <Link href={`profile?username=${authorDetails.username}`}>
                            <Typography 
                                className="font-semibold mr-2 text-black hover:text-red-500 
                                dark:text-slate-400 text-transition"
                                component="a"
                                onClick={e => e.preventDefault()}>
                                <Button 
                                    className="capitalize font-semibold mr-2 text-black hover:text-red-500 
                                    dark:text-slate-400 text-base text-transition p-0 hover:bg-transparent"
                                    onClick={e => router.push(`/profile?username=${authorDetails.username}`)}>
                                    { authorDetails.name }
                                </Button>
                            </Typography>
                        </Link>
                        { description }
                    </Typography>
                </div>
            )}
            <Comments author={author} comments={comments} ID={ID} likes={likes} />
            <Form ID={ID} />
        </Paper>
    );
};

export default Post;

