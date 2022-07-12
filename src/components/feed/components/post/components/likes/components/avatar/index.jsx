import { Avatar } from "@mui/material"
import { useContext, useMemo } from "react"
import classes from "./styles.module.css"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"

const Container = ({ username }) => {
    const { getUsersList, serverPublicURL } = useContext(AppContext);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username }), [ getUsersList, username ]);

    return (
        <Avatar 
            alt={details.name} 
            className={classes.avatar}
            src={`${serverPublicURL.current}/${details.image}`} 
        />
    );
};

export default Container;