import { Button, Typography } from "@mui/material"
import { useContext, useMemo, useRef } from "react";
import Link from "next/link"
import ShowMoreText from "react-show-more-text";
import classNames from "classnames"

import classes from "./styles.module.css"
import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"
import { getDate } from "src/helpers"

import LikesDialog from "src/components/feed/components/post/components/likes/components/likes-dialog"
import Avatar from "src/components/avatar"
import LikeButton from "./components/like-button"
import ReplyForm from "./components/reply-form"
import RepliesContainer from "./components/replies"


const Text = ({ children }) => (
    <Typography  
        className={classNames(classes.comment, `grow pr-3 dark:text-zinc-500`)}
        component={ShowMoreText}
            lines={1}
            more='Read more'
            less='Read less'
            anchorClass='my-anchor-css-class'
            expanded={false}
        >
        { children }
    </Typography>
);

const Card = ({ comment, createdAt, ID, likes, postID, replies, username }) => {
    const { getUsersList } = useContext(AppContext);

    const toggleReplyFormRef = useRef(null);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username }), [ getUsersList, username ]);
    
    return (
        <li className="flex mb-4 pb-1 last:mb-0">
            <Avatar { ...details } className={classes.avatar} />
            <div className="grow pl-4">
                <div className="flex items-start justify-between">
                    <Link href={`profile?username=${details.username}`} passHref>
                        <Typography 
                            className="font-semibold mr-2 text-zinc-600 text-sm hover:text-red-500  dark:text-slate-500"
                            component="a">
                            { details.name }
                        </Typography>
                    </Link>
                    <LikeButton commentID={ID} id={postID} likes={likes} />
                </div>
                    <Text>{ comment }</Text>
                <div>
                    <div className="flex items-center mt-1">
                        <Typography
                            className="text-[.85rem] text-zinc-600"
                            component="p">
                            { getDate(new Date(parseInt(createdAt))) }
                        </Typography>
                        <LikesDialog 
                            likes={likes} 
                            label={ likes.length > 1 ? `${likes.length} likes` : `1 like`} 
                        />
                        <Button
                            className={classNames("normal-case p-0 text-zinc-600 hover:text-red-500",
                            { "-ml-3": likes.length > 0})}
                            onClick={() => toggleReplyFormRef.current?.()}>
                            Reply
                        </Button>
                    </div>
                </div>
                <ReplyForm 
                    commentID={ID}
                    id={postID}
                    replyingTo={details.username}
                    toggleRef={toggleReplyFormRef} 
                />
                <RepliesContainer commentID={ID} postID={postID} replies={replies} />
            </div>
        </li>
    );
};

export default Card;


/*<Typography
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
</Typography>*/