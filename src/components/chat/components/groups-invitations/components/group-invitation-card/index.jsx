import { Avatar, IconButton, Typography } from "@mui/material"
import classNames from "classnames"
import classes from './styles.module.css'

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const GroupsInvitations = ({ image, name, sender }) => {
    return (
        <li className={classNames(classes.card, "flex items-center justify-between mb-3 pb-2 last:border-b-0")}>
            <div className="flex items-center">
                <Avatar 
                    className="h-[40px] text-base w-[40px]"
                    imgProps={{ loading: "lazy" }}
                    src={image ? `http://localhost:5000/${image}` : ""}>
                </Avatar>
                <div className="ml-3">
                    <Typography
                        className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                        component="h2">
                        { name }
                    </Typography>
                    <Typography className="max-w-[230px] text-sm text-slate-500" component="p">
                        { sender }
                    </Typography>
                </div>
            </div>
            <div className="flex items-center">
                <IconButton 
                    className="border border-solid border-red-500 p-[.2rem] hover:bg-red-500">
                    <CloseIcon className="text-red-500 text-[1.4rem] hover:text-white" />
                </IconButton>
                <IconButton 
                    className="border border-solid border-cyan-500 bg-cyan-500 ml-2 p-[.2rem] 
                    hover:bg-transparent">
                    <CheckIcon className="text-white text-[1.4rem] hover:text-cyan-500" />
                </IconButton>
            </div>
        </li>
    );
};

export default GroupsInvitations;