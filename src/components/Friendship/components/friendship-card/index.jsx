import { Avatar, Badge, Collapse, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useCallback, useContext, useId, useMemo, useRef, useState, useTransition } from "react";
import { AppContext } from "src/context/AppContext";
import classNames from 'classnames'
import classes from '../styles/card.module.css'
import Link from "next/link"

import { useRouter } from "next/router"

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Input from "./components/Input"
import DeleteFriendshipListItem from "./components/delete-friendship"
import Popover from "src/components/popover"

const FriendshipInvitaitonCard = ({ isOnline, image, name, username }) => {
    const router = useRouter();
    const id = useId();
    const { getInitialsNameLetters, getBgColors } = useContext(AppContext);

    const [ expanded, setExpanded ] = useState(false);
    const [ isPendig, startTransition ] = useTransition();
    const onClickRef = useRef(null);
    const onCloseRef = useRef(null)

    const toggleExpanded = useCallback(prop => () => {
        onCloseRef.current?.();
        startTransition(() => {
            setExpanded(prop);
        })
        //setAnchorEl(null);
    }, [])

    const listItemClickHandler = useCallback(prop => () => {
    }, [  ]);
    
    const goToChatClickHandler = useCallback(() => {
        router.push(`chat?page=direct-chat&dest=${username}`)
    }, [ router, username ]);

    const inputMemo = useMemo(() => <Input closeInput={toggleExpanded(false)} />, [ toggleExpanded ])
    const deleteFriendshipListItem = useMemo(() => <DeleteFriendshipListItem username={username} />, [ username ])

    return (
        <li className={classNames(classes.card, `flex flex-col pt-3 pb-2 last:border-0
            sm:px-3 sm:last:border sm:mb-4 md:last:border-0 md:px-0 md:mb-0`)}>
            <div className="flex items-center">
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    color="secondary"

                    classes={{ badge: classNames("bottom-[5px] right-[5px]", isOnline ? "bg-green-500" : "bg-red-500") }}
                    variant="dot"
                >
                    <Avatar 
                        className="h-[50px] text-base w-[50px]"
                        imgProps={{ loading: "lazy" }}
                        src={image ? `http://localhost:5000/${image}` : ""}
                        style={{ backgroundColor: image ? "transparent" : getBgColors()[username] }}>
                        { image ? "" :getInitialsNameLetters(name) }
                    </Avatar>
                </Badge>
                <div className="flex flex-col grow ml-3">
                    <div className="flex justify-between">
                        <Typography 
                            className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap dark:text-slate-300")} 
                            component="h2">
                            { name }
                        </Typography>
                        <IconButton className="p-0 dark:text-slate-400" onClick={e => onClickRef.current?.(e)}>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                    <div className="flex items-center justify-between mt-1 dark:text-slate-500">
                        <Link href={`profile?username=${username}`}>
                            <a className="text-black hover:text-cyan-500">
                                <Typography className={classNames()}>
                                    @{ username }
                                </Typography>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                { inputMemo }
            </Collapse>
            <Popover
                id={`${id}-username`}
                onClickRef={onClickRef}
                onCloseRef={onCloseRef}
            >
                <List className={classNames("pt-0 w-[230px] dark:bg-stone-900")}>
                    <ListItem 
                        disablePadding 
                        onClick={listItemClickHandler()} 
                        className={classNames("dark:hover:bg-stone-500 dark:text-slate-400")}>
                        <ListItemButton onClick={toggleExpanded(true)}>
                            <ListItemText 
                                primary="Quick message" 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem 
                        disablePadding 
                        onClick={goToChatClickHandler} 
                        className={classNames("dark:hover:bg-stone-500 dark:text-slate-400")}>
                        <ListItemButton>
                            <ListItemText 
                                primary="Go to chat" 
                            />
                        </ListItemButton>
                    </ListItem>
                    { deleteFriendshipListItem }
                </List>
            </Popover>
        </li>
    );
};

export default FriendshipInvitaitonCard;