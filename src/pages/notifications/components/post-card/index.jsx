import { useContext, useMemo } from "react"
import { Paper, Typography } from "@mui/material"
import classNames from "classnames"

import classes from "./styles.module.css"
import { getUserDetails } from "src/helpers/user"
import { getDate } from "src/helpers"
import { AppContext } from "src/context"

import CircleIcon from '@mui/icons-material/Circle';

import Avatar from "src/components/avatar"
import Header from "../header"
import Body from "../body"


const Card = (props) => {
    const { author, checked, createdAt, commentId, post, replyId, type } = props;
    const { getUsersList } = useContext(AppContext);
    console.log(author)
    const authorDetails = useMemo(() => {
        return getUserDetails({ list: getUsersList(), username: author });
    }, [ author, getUsersList ])//href={`notifications?dialog=posts&id=${post.ID}`}

    return (
        <Paper 
            component="li" 
             className={classNames(`mb-3 flex items-start px-3 py-4 last:border-0`)}
             elevation={0}>
            <Avatar 
                { ...authorDetails }
                className={classes.avatar}
            />
            <div className="ml-3">
                <Header { ...props } author={authorDetails} />
                <Body { ...props } />
                <footer className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                        <Typography
                            component="p"
                            className={classes.text}>
                            { post.likes.length } likes
                        </Typography>
                        <CircleIcon className={classNames(classes.circle, "mx-3")} />
                        <Typography
                            component="p"
                            className={classes.text}>
                            { post.comments.length } likes
                        </Typography>
                    </div>
                    <Typography
                        component="p"
                        className={classes.text}>
                        { getDate(parseInt(createdAt)) }
                    </Typography>
                </footer>
            </div>
        </Paper>
    );
};

export default Card;