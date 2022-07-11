import { Avatar } from "@mui/material"
import { useContext, useMemo } from "react"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"

const Container = ({ username }) => {
    const { getUsersList, serverPublicURL } = useContext(AppContext);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username }), [ getUsersList, username ]);

    return (
        <Avatar 
            alt={details.name} 
            className="h-[22px] w-[22px] dark:border-0"
            src={`${serverPublicURL.current}/${details.image}`} 
        />
    );
};

export default Container;