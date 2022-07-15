import { IconButton } from "@mui/material";
import { useEffect, useState } from "react"
import classNames from "classnames"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import classes from "./styles.module.css"

const Button = ({ onClose, onOpen, onClick }) => {
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        onClose.current = () => setOpen(false);
    }, [ onClose ]);

    useEffect(() => {
        onOpen.current = () => setOpen(true);
    }, [ onOpen ]);
    console.log(open)
    return (
        <IconButton 
            className={classNames({ "hidden": !open }, classes.button, 
            `absolute bg-zinc-400 text-slate-200 hover:bg-zinc-500`)}
            onClick={onClick}>
            <ArrowUpwardIcon />
        </IconButton>
    );
};

export default Button;