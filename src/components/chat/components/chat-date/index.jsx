import { Typography } from "@mui/material"
import { getOnlyDate } from "src/helpers"
import classNames from "classnames"

import classes from "./styles.module.css"

const Container = ({ createdAt }) => {
    return (
        <div className="border border-solid border-slate-500 dark:dark:border-slate-200 flex justify-center mt-4 mb-8 relative">
            <Typography 
                className={classNames(classes.date, "absolute font-semibold px-12 dark:bg-stone-600")}
                >
                { getOnlyDate(new Date(parseInt(createdAt))) }
            </Typography>
        </div>
    );
};

export default Container;