import Link from "next/link"
import { useContext, useMemo } from "react"
import { Paper, Typography } from "@mui/material"
import classNames from "classnames"

import classes from "./styles.module.css"
import { getUserDetails } from "src/helpers/user"
import { AppContext } from "src/context"

import Avatar from "src/components/avatar"
import Header from "../header"


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
             className={classNames(`flex items-start px-3 py-4`)}
             elevation={0}>
            <Avatar 
                { ...authorDetails }
                className={classes.avatar}
            />
            <div className="ml-3">
                <Header { ...props } author={authorDetails} />
            </div>
        </Paper>
    );
};

export default Card;