import { Avatar } from "@mui/material"
import { useContext, useMemo } from "react"

import { AppContext } from "src/context"

const Container = ({ username }) => {
    const { getUsersList, serverPublicURL } = useContext(AppContext);

    const details = useMemo(() => {
        const result = getUsersList().find(user => user.username === username);

        if(result) return result;

        return { image: "", name: "", username: "" }
    }, [ getUsersList, username ]);

    return (
        <Avatar 
            alt={details.name} 
            className="h-[20px] w-[20px]"
            src={`${serverPublicURL.current}/${details.image}`} 
        />
    );
};

export default Container;