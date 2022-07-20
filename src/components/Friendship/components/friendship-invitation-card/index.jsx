import { IconButton, Typography } from "@mui/material";
import { Collapse } from '@mui/material';
import { useCallback, useMemo, useState } from "react";
import classNames from 'classnames'
import Link from "next/link"
import classes from '../styles/card.module.css'

import { getDate } from "src/helpers"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Avatar from "src/components/avatar"
import Buttons from "./components/buttons"

const FriendshipInvitaitonCard = ({ description, ID, datetime, image, sender }) => {
    const [ expanded, setExpanded ] = useState(false);
    
    const toggleExpanded = useCallback(() => setExpanded(b => !b), []);

    const hasDescription = useMemo(() => {
        if(!Boolean(description)) return false;
        return description.trim().length > 0;
    }, [ description ]);

    return (
        <li className={classNames(classes.card, `flex flex-col pt-3 pb-2 last:border-0
        sm:pr-3 sm:pl-2 sm:last:border sm:mb-4 md:last:border-0 md:mb-0 md:px-0`)}>
            <div className="flex items-center">
                <Avatar 
                    className={classes.friendAvatar}
                    image={sender.image}
                    variant="square" 
                />
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
                        <Link href={`profile?username=${sender.username}`}>
                            <a className="text-black hover:text-cyan-500">
                                <Typography className={classNames()}>
                                @{ sender.username }
                                </Typography>
                            </a>
                        </Link>
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