import Head from "next/head"
import Link from "next/link"
import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/router"
import { Hidden, IconButton, Typography } from "@mui/material"
import { useMutation } from "@apollo/client"
import moment from 'moment'
import classNames from 'classnames'
import classes from "./styles.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextfieldContainer from "../textfield";

import { ChatContext, LoginContext } from "src/context"
import { useGroupChatQuery } from "src/hooks"

import { READ_GROUP_MESSAGE, SEND_GROUP_MESSAGE } from "src/graphql/mutations"

import Empty from "src/components/empty"
import MessageCard from '../message-card'
import InviteUserButton from "./components/InviteUser"
import Menu from "./components/options"
import Sidebar from "./components/sidebar"
import ChatDate from "../chat-date"

const GroupChatContainer = () => {
    const router = useRouter();
    const { id, } = router.query;

    const sendGroupMessageMutation = useMutation(SEND_GROUP_MESSAGE);
    const readGroupMessageMutation = useMutation(READ_GROUP_MESSAGE);

    const { loggedUser, user } = useContext(LoginContext)
    const { repliedMessage, setRepliedMessage } = useContext(ChatContext);

    const { data } = useGroupChatQuery({ id, loggedUser });

    const chatIDRef = useRef("");
    const mainRef = useRef(null);


    const makeMessagesAsRead = useCallback((chatID) => {
        const readMessage = readGroupMessageMutation[0];

        readMessage({
            variables: {
                chatID
            },
            onError(error) {
                console.error(error);
            }
        })
    }, [ readGroupMessageMutation ]);

    const currentDate = useRef("");
    const chatDetails = useMemo(() => {
        if(data) {
            currentDate.current = "";
            chatIDRef.current = data.group.ID;

            return data.group;
        }
        return { invitations: [], messages: [], members: [] };
    }, [ data ]);

    const friendshipDate = useMemo(() => {
        if(chatDetails.createdAt) return moment(new Date(parseInt(chatDetails.createdAt))).format("DD-MM-YYYY");
        return "";
    }, [ chatDetails ]);
    
    const inviteUserButton = useMemo(() => <InviteUserButton group={chatDetails} />, [ chatDetails ]);
    const menuButton = useMemo(() => <Menu group={chatDetails} groupID={chatIDRef} />, [ chatDetails ])

    useEffect(() => {
        if(Boolean(data) && mainRef.current) {
            const scrollHeight = mainRef.current.scrollHeight;
            mainRef.current.scroll({ behavior: "smooth", top: scrollHeight })
        }
    }, [ data ]);
    
    const hasRepliedMessage = useMemo(() => {
        return Object.keys(repliedMessage).length > 0 && !repliedMessage.isDirectChat;
    }, [ repliedMessage ]);
    
    const sendGroupMessage = useCallback(({ inputRef, imageRef }) => {
        const send = sendGroupMessageMutation[0];

        send({ variables: {
            messageInput: {
                groupID: chatIDRef.current,
                image: imageRef.current,
                isForwarded: false,
                reply: hasRepliedMessage ? repliedMessage.ID : "",
                text: inputRef.current.value
            }},
            onCompleted() {
                inputRef.current.value = "";
                setRepliedMessage({});
            },
            onError(err) {
                console.error(err)
            }
        })

    }, [ hasRepliedMessage, repliedMessage, setRepliedMessage, sendGroupMessageMutation ]);

    const textfieldContainer = useMemo(() => <TextfieldContainer sendHandler={sendGroupMessage} />, [ sendGroupMessage ]);

    const isDateChanged = useCallback(date => { 
        const convertedDay = moment(new Date(parseInt(date))).format("D MM YYYY");

        if(convertedDay !== currentDate.current) {
            currentDate.current = convertedDay;
            return true;
        }
        return false;
    }, []);

    const hasUnreadMessages = useCallback((messages, username) => {
        return messages.find(message => {
            if(message.sender !== username) {
                const checkUnreadMessage = message.isRead.find(report => report.username === username && !report.isRead);

                return checkUnreadMessage ? true : false;
            }

            return false;
        })
    }, [])

    useEffect(() => {
        const hasUser = Boolean(user);
        const hasData = Boolean(data);
        if(hasUser && hasData) {
            if(hasUnreadMessages(data.group.messages, user.username)) {
                makeMessagesAsRead(data.group.ID);
            }
        }
    }, [ data, hasUnreadMessages, makeMessagesAsRead, user ]);
    
    return (
        <div 
            className={classNames("flex grow items-stretch h-screen")}>
            <Head>
                <meta name="theme-color" content="#2597BB" />
                <title>{ chatDetails.name } | Chat</title>
            </Head>
            <div className="flex flex-col grow items-stretch pb-[5rem] md:relative dark:md:bg-stone-600">
                <header className="bg-cyan-700 py-2 pr-2 fixed flex items-center justify-between left-0 top-0 
                    w-full z-10 md:absolute dark:md:bg-stone-600">
                    <div className="flex items-center md:pl-3">
                        <Hidden mdUp>
                            <Link href="chat">
                                <a>
                                    <IconButton>
                                        <ArrowBackIcon className="text-slate-100" />
                                    </IconButton>
                                </a>
                            </Link>
                        </Hidden>
                        <div className="flex flex-col">
                            <Typography 
                                className={classNames(classes.names, "text-slate-100 text-ellipsis overflow-hidden whitespace-nowrap")} 
                                component="h1">
                                { chatDetails.name }
                            </Typography>
                            <Typography 
                                className={classNames(classes.names, "mt-1 text-slate-300 text-sm text-ellipsis overflow-hidden whitespace-nowrap")} 
                                component="p">
                                { chatDetails.members.filter(member => loggedUser.username !== member).join(", ") }
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center">
                        { inviteUserButton }
                        { menuButton }
                    </div>
                </header>
                <main className="flex h-full items-stretch flex-col chat__main scroll-bar dark:bg-stone-600" ref={mainRef}>
                    <div className="grow pt-4">
                        <div>
                            <Typography className="text-center" component="h2">
                                { friendshipDate }
                            </Typography>
                        </div> 
                        { chatDetails.messages.length > 0 ? (
                            <div className="flex flex-col items-stretch px-4 pt-6 sm:px-8 md:px-6">
                                {
                                    chatDetails.messages.map((item, index) => {
                                        if(isDateChanged(item.createdAt)) {
                                            return (
                                                <div className="flex flex-col items-stretch" key={item.ID}>
                                                    <ChatDate createdAt={item.createdAt} />
                                                    <MessageCard 
                                                        { ...item } 
                                                        chatIDRef={chatIDRef} 
                                                        isDateChanged
                                                        message={item} 
                                                        messages={chatDetails.messages}
                                                        messageIndex={index}
                                                    />
                                                </div>
                                            );
                                        }
                                        return (
                                            <MessageCard 
                                                { ...item }
                                                key={item.ID}  
                                                chatIDRef={chatIDRef} 
                                                message={item} 
                                                messages={chatDetails.messages}
                                                messageIndex={index}
                                            />
                                        )
                                    })
                                }
                            </div>
                        ) : 
                        <Empty className={classes.emptyContainer} message="There are no messages yet" />}
                    </div>
                    { textfieldContainer }
                </main>
            </div>
            <Hidden lgDown>
                <Sidebar group={chatDetails} />
            </Hidden>
        </div>
    );
};

export default GroupChatContainer;