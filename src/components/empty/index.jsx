import { Typography } from "@mui/material"
import classNames from "classnames"

import classes from "./styles.module.css"

const Container = ({ children, className, message }) => {
    return (
        <div className={classNames(className, classes.root, "flex flex-col items-center justify-center")}>
            <Typography 
                className={classNames(classes.title, "font-bold text-center text-xl md:text-2xl")}
                component="h2">
                { message }
            </Typography>
            { children }
        </div>
    );
};

export default Container;