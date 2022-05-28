import { useCallback, useContext, useMemo } from "react"
import { Avatar, Typography } from "@mui/material";
import classNames from "classnames";
import { useRouter } from 'next/router'

import { getDate } from "src/helpers"

import classes from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

import { LoginContext } from "src/context/LoginContext"
import { AppContext } from "src/context/AppContext"

library.add(faCheckDouble);

const MessageCard = ({ image, ID, messages, users }) => {
    const { user } = useContext(LoginContext)
    const { getBgColors, getUsersList } = useContext(AppContext)

    const destinatary = useMemo(() => {
        const name = users[0] === user?.username ? users[1] : users[0];
        const result = getUsersList().find(item => item.username === name);

        if(result) return result;
        return {};
    }, [ getUsersList, user, users ]);

    const unreadMessagesLength = useMemo(() => {
        return messages.reduce((previousValue, currentMessage) => {
            if((currentMessage.sender === destinatary.username) && !(currentMessage.isRead)) {
                return previousValue + 1;
            }
            return previousValue;
        }, 0);
    }, [ destinatary, messages ]);

    const router = useRouter();
    const clickHandler = useCallback(() => {
        router.push(`/?tab=chat&page=direct-chat&dest=${destinatary.username}`)
    }, [ destinatary, router ])

    if(messages.length === 0) return <></>;

    return (
        <article 
            className={classNames(classes.card, "flex items-center px-5 py-2 last:border-0")}
            onClick={clickHandler}>
            <Avatar 
                src={`http://localhost:5000/${destinatary.image}`}
                className="text-base"
            />
            <div className="flex flex-col grow items-stretch ml-3">
                <Typography 
                    className={classNames("flex items-center justify-between")} 
                    component="h2">
                    <span className="font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap">
                        { destinatary.name }
                    </span>
                    <span className="text-xs">
                        { getDate(new Date(parseInt(messages[messages.length - 1].createdAt))) }
                    </span>
                </Typography>
                <div className="flex items-center justify-between mt-1">
                    <Typography className={classNames("flex items-center max-w-[250px] overflow-hidden text-sm text-ellipsis whitespace-nowrap")}>
                        <FontAwesomeIcon 
                            className={classNames("mr-2", messages[messages.length - 1].isRead ? "text-cyan-500" : "text-slate-300")}
                            icon="fa-solid fa-check-double" 
                        />
                        { messages[messages.length - 1].text }
                    </Typography>
                    { unreadMessagesLength > 0 && <Typography className="text-cyan-500">
                        { unreadMessagesLength }x
                    </Typography> }
                </div>
            </div>
        </article>
    );
};

export default MessageCard;