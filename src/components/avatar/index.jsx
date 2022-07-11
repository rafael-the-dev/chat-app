import { Avatar } from "@mui/material"
import { useContext, useMemo } from "react";
import classNames from "classnames"
import classes from "./styles.module.css"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"


const Container = ({ className, image, name, username, size }) => {
    const { getUsersList, serverPublicURL } = useContext(AppContext);
    
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
            classes={{root: "dark:border-0"}}
            className={classNames(" dark:border-0", customClasses, classes.avatar)}
            src={`${serverPublicURL.current}/${details.image}`} 
        />
    );
};

export default Container;