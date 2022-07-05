import { Button, IconButton, Typography } from "@mui/material"
import { useContext, useMemo, useRef } from "react";
import Link from "next/link"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"
import { getDate } from "src/helpers"

import Avatar from "src/components/avatar"
import LikeButton from "./components/like-button"
import ReplyForm from "./components/reply-form"

const Card = ({ comment, createdAt, ID, likes, postID, username }) => {
    const { getUsersList } = useContext(AppContext);

    const toggleReplyFormRef = useRef(null);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username }), [ getUsersList, username ]);
    
    return (
        <li className="flex mb-4 pb-1 last:mb-0">
            <Avatar { ...details } />
            <div className="grow pl-4">
                <div className="flex items-center justify-between">
                    <Typography
                        className="flex"
                        component="p">
                        <Link href={`profile?username=${details.username}`}>
                            <a className="mr-2">
                                <Typography 
                                    className="font-semibold text-zinc-600 text-sm hover:text-red-500"
                                    component="span">
                                    { details.username }
                                </Typography>
                            </a>
                        </Link>
                        { comment }
                    </Typography>
                    <LikeButton commentID={ID} id={postID} likes={likes} />
                </div>
                <div>
                    <div className="flex items-center mt-2">
                        <Typography
                            className="text-[.85rem] text-zinc-600"
                            component="p">
                            { getDate(new Date(parseInt(createdAt))) }
                        </Typography>
                        <Button
                            className="normal-case py-0 text-zinc-600 hover:text-red-500"
                            onClick={() => toggleReplyFormRef.current?.()}>
                            Reply
                        </Button>
                    </div>
                </div>
                <ReplyForm toggleRef={toggleReplyFormRef} />
            </div>
        </li>
    );
};

export default Card;