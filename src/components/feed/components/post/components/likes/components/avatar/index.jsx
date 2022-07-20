import Avatar from "src/components/avatar"
import { useContext, useMemo } from "react"
import classes from "./styles.module.css"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"

const Container = ({ username }) => {
    const { getUsersList } = useContext(AppContext);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username }), [ getUsersList, username ]);

    return (
        <Avatar 
            alt={details.name} 
            className={classes.avatar}
            image={details.image} 
        />
    );
};

export default Container;