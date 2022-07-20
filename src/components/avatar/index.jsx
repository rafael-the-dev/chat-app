import { Avatar } from "@mui/material"
import { useContext, useMemo } from "react";
import classNames from "classnames"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"
import { getURL } from "src/helpers"


const Container = ({ className, image, name, onClick, username, variant }) => {
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
            onClick={onClick}
            src={getURL({ url: details.image })} 
            variant={variant}
        />
    );
};

export default Container;