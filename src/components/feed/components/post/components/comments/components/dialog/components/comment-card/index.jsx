import { Button, Hidden, Typography } from "@mui/material"
import { useContext, useMemo, useRef } from "react";
import Link from "next/link"
import ShowMoreText from "react-show-more-text";
import classNames from "classnames"

import classes from "./styles.module.css"
import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"
import { getDate } from "src/helpers"

import Avatar from "src/components/avatar"
import LikeButton from "./components/like-button"
import ReplyForm from "./components/reply-form"
import RepliesContainer from "./components/replies"


const Text = ({ children }) => (
    <Typography  
        className={classNames(classes.comment, `grow pr-3`)}
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
                    <Hidden mdUp>
                        <Text>{ comment }</Text>
                    </Hidden>
                    <Hidden mdDown>
                        <Text >
                            <Link href={`profile?username=${details.username}`} passHref>
                                <Typography 
                                    className="font-semibold mr-2 text-zinc-600 text-sm hover:text-red-500"
                                    component="a">
                                    { details.name }
                                </Typography>
                            </Link>
                            { comment }
                        </Text>
                    </Hidden>
                    <LikeButton commentID={ID} id={postID} likes={likes} />
                </div>
                <div>
                    <div className="flex items-center mt-1">
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