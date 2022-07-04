import { Avatar } from "@mui/material"
import { useContext, useMemo } from "react";

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"


const Container = ({ image, name, username, size }) => {
    const { getUsersList, serverPublicURL } = useContext(AppContext);
    
    const details = useMemo(() => {
        if(image) {
            return { image, name };
        }

        return getUserDetails({ list: getUsersList(), username });
    }, [ getUsersList, image, name, username ]);

    const defaultSize = size ? size : 40;

    return (
        <Avatar 
            alt={details.name} 
            className={`h-[${defaultSize}px] w-[${defaultSize}px]`}
            src={`${serverPublicURL.current}/${details.image}`} 
        />
    );
};

export default Container;