import { Avatar, MenuItem, Typography } from "@mui/material"
import classNames from "classnames"

import CircleIcon from '@mui/icons-material/Circle';
import { getInitialsNameLetters } from "src/helpers"

const UserContainer = ({ image, isOnline, name, setValue, username }) => {
    const clickHandler = prop => event => {
        setValue(prop);
    }
    return (
        <MenuItem className="" value={username} onClick={clickHandler(username)}>
            <div className={classNames("flex items-center w-full")}>
                <Avatar 
                    className="h-[25px] text-base w-[25px]"
                    src={image ? `http://localhost:5000/${image}` : ""}>
                    { image ? "" :getInitialsNameLetters(name) }
                </Avatar>
                <Typography 
                    className={classNames("font-semibold grow ml-3 max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                    component="h2">
                    { name }
                </Typography>
                <CircleIcon className={classNames("text-[.5rem]", isOnline ? "text-green-500" : "text-red-500")} />
            </div>
        </MenuItem>
    );
};

export default UserContainer;