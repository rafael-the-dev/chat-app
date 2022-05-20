import { Avatar, IconButton, Typography } from "@mui/material";
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { AppContext } from "src/context/AppContext";
import classNames from 'classnames'
import classes from './styles.module.css'

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FriendshipInvitaitonCard = ({ image, name, username }) => {
    const { getInitialsNameLetters, getBgColors } = useContext(AppContext);
    const [ expanded, setExpanded ] = useState(false);

    const toggleExpanded = useCallback(prop => () => setExpanded(prop));

    <article className={classNames(classes.card, `flex items-center py-2 last:border-0`)}>
            <div>
                <Avatar 
                    src={image ? `http://localhost:5000/${image}` : ""}
                    style={{ backgroundColor: image ? "transparent" : getBgColors()[username] }} 
                    className="text-base">
                    { image ? "" :getInitialsNameLetters(name) }
                </Avatar>
                <div className="flex flex-col grow ml-3">
                    <div className="flex items-center justify-between">
                        <Typography 
                            className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                            component="h2">
                            { name }
                        </Typography>
                        <Typography className={classNames("")}>
                           12/05/2022
                        </Typography>
                    </div>
                    <Typography className={classNames("mt-1")}>
                        @{ username }
                    </Typography>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Typography className="flex items-center">
                    Description { expanded ? <KeyboardArrowDownIcon className="rotate-180 ml-2" onClick={toggleExpanded(false)} /> : <KeyboardArrowDownIcon className="ml-2"  onClick={toggleExpanded(true)} />}
                </Typography>
                <div>
                    <IconButton 
                        className="">
                        <CloseIcon className="opacity-80 text-red-500" />
                    </IconButton>
                    <IconButton 
                        className="ml-3">
                        <CheckIcon className="opacity-80 text-blue-600" />
                    </IconButton>
                </div>
            </div>
    </article>
};

export default FriendshipInvitaitonCard;