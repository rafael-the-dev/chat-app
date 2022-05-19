import { Avatar, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import classNames from 'classnames'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import classes from './styles.module.css'

const Container = ({ image, name, username }) => {
    const { getInitialsNameLetters, getBgColors } = useContext(AppContext);

    return (
        <article className={classNames(classes.card, `flex items-center py-2 last:border-0`)}>
            <Avatar style={{ backgroundColor: getBgColors()[username] }} className="text-base">{ getInitialsNameLetters(name)}</Avatar>
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
            <IconButton className="ml-3">
                <PersonAddIcon className="opacity-80 text-blue-600" />
            </IconButton>
        </article>
    );
};

export default Container;