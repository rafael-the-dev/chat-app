import { Button, Typography } from "@mui/material"
import Link from "next/link";
import classNames from "classnames"

import classes from "./styles.module.css"

const Container = () => {
    return (
        <div className={classNames(classes.root, "flex flex-col items-center justify-center")}>
            <Typography 
                className={classNames(classes.title, "font-bold text-xl md:text-2xl")}
                component="h2">
                User not found!
            </Typography>
            <Link href="/">
                <a className="mt-4">
                    <Button className="px-12" variant="contained">Home</Button>
                </a>
            </Link>
        </div>
    );
};

export default Container;