import { Avatar, Checkbox, Typography } from "@mui/material"
import classNames from 'classnames'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const UserCheckbox = ({ image, name, username }) => {
    return (
        <label 
            className={classNames("flex items-center w-full")} 
            htmlFor={`${username}-checkbox`}>
            <Avatar 
                className="h-[25px] text-base w-[25px]"
                src={image ? `http://localhost:5000/${image}` : ""}>
            </Avatar>
            <Typography 
                className={classNames("font-semibold grow ml-3 max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                component="span">
                { name }
            </Typography>
            <Checkbox 
                id={`${username}-checkbox`}
                { ...label } 
            />
        </label>
    );
};

export default UserCheckbox;