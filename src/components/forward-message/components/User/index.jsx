import { Avatar, MenuItem, Typography } from "@mui/material"
import classNames from "classnames"

import CircleIcon from '@mui/icons-material/Circle';
import { getInitialsNameLetters } from "src/helpers"

const UserContainer = ({ image, isOnline, name, username }) => {
    return (
        <MenuItem value={username} 
            className={classNames()}>
            <div className={classNames("flex items-center")}>
                <Avatar 
                    src={image ? `http://localhost:5000/${image}` : ""} 
                    className="text-base">
                    { image ? "" :getInitialsNameLetters(name) }
                </Avatar>
                <div className="flex flex-col grow ml-3">
                    <Typography 
                        className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                        component="h2">
                        { name }
                    </Typography>
                    <Typography className={classNames("mt-1")}>
                        @{ username }
                    </Typography>
                </div>
                <CircleIcon className={classNames(isOnline ? "text-green-500" : "text-red-500")} />
            </div>
        </MenuItem>
    );
};

export default UserContainer;