import { useContext } from "react";
import { IconButton } from "@mui/material"

import { LoginContext } from "src/context"
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Options = ({ author }) => {
    const { loggedUser } = useContext(LoginContext);

    return (
        loggedUser.username === author ? (
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        ) : <></>
    );
};

export default Options;