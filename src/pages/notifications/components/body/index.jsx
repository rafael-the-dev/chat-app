import { Typography } from "@mui/material"
import classNames from "classnames"

import classes from "./styles.module.css"
import Image from "src/components/image"

const Container = ({ post }) => {

    return (
        <div className="border border-solid border-zinc-200 mt-2 rounded-lg">
            <div className={classNames(classes.content, `flex items-center`)}>
                <Image 
                    alt={post.description}
                    url={post.image}
                />
                <Typography 
                    className={classNames(classes.description, "overflow-hidden px-2 text-sm text-ellipsis whitespace-nowrap")}
                    component="p">
                    { post.description }
                </Typography>
            </div>
        </div>
    );
};

export default Container;