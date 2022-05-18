import { Avatar, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import classNames from 'classnames'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Container = ({ image, name, username }) => {
    const { getInitialsNameLetters, getBgColors } = useContext(AppContext);

    return (
        <article className={classNames(`flex itemscenter`)}>
            <Avatar className={getBgColors()[username]}>{ getInitialsNameLetters(name)}</Avatar>
            <div className="flex flex-col grow ml-3">
                <Typography 
                    className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                    component="h2">
                    { name }
                </Typography>
                <Typography className={classNames("mt-2")}>
                    { username }
                </Typography>
            </div>
            <IconButton className="ml-3">
                <PersonAddIcon className="text-blue-600" />
            </IconButton>
        </article>
    );
};

export default Container;