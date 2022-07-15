import { Avatar } from "@mui/material"
import { useContext, useMemo } from "react";
import classNames from "classnames"
import classes from "./styles.module.css"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"
import { getURL } from "src/helpers"


const Container = ({ className, image, name, username, size }) => {
    const { getUsersList } = useContext(AppContext);
    
    const details = useMemo(() => {
        if(image) {
            return { image, name };
        }

        return getUserDetails({ list: getUsersList(), username });
    }, [ getUsersList, image, name, username ]);

    const customClasses = className ? className : `h-[40px] w-[40px]`;

    return (
        <Avatar 
            alt={details.name} 
            classes={{ root: "border-0" }}
            className={classNames(" dark:border-0", customClasses)}
            imgProps={{ loading: "lazy" }}
            src={getURL({ url: details.image })} 
        />
    );
};

export default Container;