import { Button, Hidden, Typography } from "@mui/material"
import { useContext, useMemo, useRef } from "react";
import Link from "next/link"
import classNames from "classnames"
import ShowMoreText from "react-show-more-text";

import classes from "./styles.module.css"
import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"
import { getDate } from "src/helpers"

import Avatar from "src/components/avatar"
import LikeButton from "../like-button"
import ReplyForm from "../reply-form"

const UserLink = ({ textColor, username }) => (
    <Link href={`profile?username=${username}`}>
        <a className="mr-2">
            <Typography 
                className={`font-semibold text-sm hover:text-red-500 ${ textColor ? "text-blue-900" : "text-zinc-600"}`}
                component="span">
                { username }
            </Typography>
        </a>
    </Link>
);

const Text = ({ children, lines }) => (
    <Typography  
        className={classNames(classes.comment, `grow pr-3`)}
        component={ShowMoreText}
            lines={ lines ? lines : 1 }
            more='Read more'
            less='Read less'
            anchorClass='my-anchor-css-class'
            expanded={false}
        >
        { children }
    </Typography>
);

const Card = ({ comment, commentID, createdAt, ID, likes, postID, replyingTo, username }) => {
    const { getUsersList } = useContext(AppContext);

    const toggleReplyFormRef = useRef(null);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username }), [ getUsersList, username ]);
    
    return (
        <li className="flex mb-4 pb-1 last:mb-0">
            <Avatar { ...details } className={classes.avatar} />
            <div className="grow pl-3 md:pl-4">
                <div className="flex items-center justify-between">
                    <Hidden mdUp>
                        <Text>{ comment }</Text>
                    </Hidden>
                    <Hidden mdDown>
                        <Text lines={3}>
                            <UserLink username={details.username} />
                            <UserLink username={replyingTo} textColor />
                            <span>details.username</span>
                            { comment }
                        </Text>
                    </Hidden>
                    <LikeButton commentID={commentID} id={postID} likes={likes} smallIcon />
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
                <ReplyForm 
                    commentID={commentID}
                    id={postID}
                    replyingTo={details.username}
                    toggleRef={toggleReplyFormRef} 
                />
            </div>
        </li>
    );
};

export default Card;