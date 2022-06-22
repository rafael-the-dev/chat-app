import { Avatar, IconButton, Typography } from "@mui/material";
import { Collapse } from '@mui/material';
import { useCallback, useContext, useMemo, useState } from "react";
import { AppContext } from "src/context/AppContext";
import classNames from 'classnames'
import classes from './styles.module.css'

import { getDate } from "src/helpers"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Buttons from "./components/buttons"

const FriendshipInvitaitonCard = ({ description, ID, datetime, image, sender }) => {
    const { getInitialsNameLetters, getBgColors } = useContext(AppContext);
    const [ expanded, setExpanded ] = useState(false);
    
    const toggleExpanded = useCallback(() => setExpanded(b => !b), []);

    const hasDescription = useMemo(() => {
        if(!Boolean(description)) return false;
        return description.trim().length > 0;
    }, [ description ]);

    return (
        <li className={classNames(classes.card, `flex flex-col pt-3 pb-2 last:border-0`)}>
            <div className="flex items-center">
                <Avatar 
                    className="h-[50px] text-base w-[50px]"
                    src={sender.image ? `http://localhost:5000/${sender.image}` : ""}
                    style={{ backgroundColor: image ? "transparent" : getBgColors()[sender.username] }} 
                    variant="square">
                    { sender.image ? "" :getInitialsNameLetters(sender.name) }
                </Avatar>
                <div className="flex flex-col grow ml-3">
                    <div className="flex items-center justify-between">
                        <Typography 
                            className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                            component="h2">
                            { sender.name }
                        </Typography>
                        <Typography className={classNames("text-sm")}>
                            { getDate(new Date(parseInt(datetime))) }
                        </Typography>
                    </div>
                    <div className="flex items-center justify-between">
                        <Typography className={classNames()}>
                            @{ sender.username }
                        </Typography>
                        <Buttons ID={ID} />
                    </div>
                </div>
            </div>
            { hasDescription && (
                <>
                    <div className="flex items-center justify-between">
                        <Typography className="" component="h3">
                            Description 
                        </Typography>
                        <IconButton onClick={toggleExpanded}>
                            { expanded ? <KeyboardArrowDownIcon className={classes.iconRotate} /> : <KeyboardArrowDownIcon className="" />}
                        </IconButton>
                    </div>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography className="text-gray-700">
                            { description } 
                        </Typography>
                    </Collapse>
                </>
            )}
        </li>
    );
};

export default FriendshipInvitaitonCard;