import { useCallback, useContext, useMemo } from "react"
import { Typography } from "@mui/material";
import classNames from "classnames";
import { useRouter } from 'next/router'
import Link from "next/link"

import { getDate } from "src/helpers"

import classes from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

import { LoginContext } from "src/context/LoginContext"
import { AppContext } from "src/context/AppContext";
import Avatar from "src/components/avatar"

library.add(faCheckDouble);

const MessageCard = ({ image, ID, messages, name }) => {
    const { loggedUser } = useContext(LoginContext)
    const { getUsersList } = useContext(AppContext)

    const countUnreadMessages = useMemo(() => {
        return messages.reduce((previousValue, currentMessage) => {
            if((currentMessage.sender !== loggedUser.username) && !(currentMessage.isRead)) {
                return previousValue + 1;
            }
            return previousValue;
        }, 0);
    }, [ loggedUser, messages ]);

    const lastMessageDate = useMemo(() => {
        return messages.length > 1 ? getDate(new Date(parseInt(messages[messages.length - 1].createdAt))) : "";
    }, [ messages ]);

    const router = useRouter();
    const clickHandler = useCallback(() => {
    }, [  ])

    //if(messages.length === 0) return <></>;

    return (
        <li className={classNames(classes.card, "w-full last:border-0 dark:hover:bg-stone-600")}>
            <Link href={`chat?tab=chat&page=group-chat&id=${ID}`}>
                <a 
                    className={classNames("flex items-center px-5 py-2 text-black w-full")}
                    onClick={clickHandler}>
                    <Avatar 
                        image={image}
                    />
                    <div className="flex flex-col grow items-stretch ml-3">
                        <Typography 
                            className={classNames("flex items-center justify-between ")} 
                            component="h2">
                            <span className="font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap dark:text-slate-400">
                                { name }
                            </span>
                            <span className="text-xs dark:text-slate-500">
                                { lastMessageDate }
                            </span>
                        </Typography>
                        { messages.length > 1 && <div className="flex items-center justify-between mt-1">
                            <Typography className={classNames("flex items-center max-w-[220px] overflow-hidden text-sm text-ellipsis whitespace-nowrap dark:text-slate-500")}>
                                <FontAwesomeIcon 
                                    className={classNames("mr-2", messages[messages.length - 1].isRead ? "text-cyan-500" : "text-slate-300")}
                                    icon="fa-solid fa-check-double" 
                                />
                                { messages[messages.length - 1].text }
                            </Typography>
                            { countUnreadMessages > 0 && <Typography className="text-cyan-500">
                                { countUnreadMessages }x
                            </Typography> }
                        </div>}
                    </div>
                </a>
            </Link>
        </li>
    );
};

export default MessageCard;