import Head from "next/head"
import Link from "next/link"
import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/router"
import { IconButton, Typography } from "@mui/material"
import { useMutation } from "@apollo/client"
import moment from 'moment'
import classNames from 'classnames'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextfieldContainer from "../textfield";

import { ChatContext, LoginContext } from "src/context"
import { useDirectChatQuery, useUserQuery } from "src/hooks"
import { getOnlyDate } from "src/helpers"

import { READ_DIRECT_MESSAGE, SEND_DIRECT_MESSAGE } from "src/graphql/mutations"
import { GET_DIRECTS_CHAT } from "src/graphql/queries"
import MessageCard from '../message-card'

const DirectChatContainer = () => {
    const router = useRouter();
    const { dest, id } = router.query;

    const sendDirectMessageMutation = useMutation(SEND_DIRECT_MESSAGE);
    const readDirectMessageMutation = useMutation(READ_DIRECT_MESSAGE);

    const { loggedUser } = useContext(LoginContext)
    const { repliedMessage, setRepliedMessage } = useContext(ChatContext);

    const destinataryResult = useUserQuery({ dest, loggedUser });
    const { data } = useDirectChatQuery({ dest, id, loggedUser, users: [ dest, loggedUser.username ] });

    const chatIDRef = useRef("");
    const destinataryRef = useRef("");
    const mainRef = useRef(null);

    const destinatary = useMemo(() => {
        if(destinataryResult.data)  {
            destinataryRef.current = destinataryResult.data.user.username;
            return destinataryResult.data.user;
        }
        return {};
    }, [ destinataryResult ]);

    const makeMessagesAsRead = useCallback((chatID) => {
        const readMessage = readDirectMessageMutation[0];

        readMessage({
            variables: {
                chatID
            },
            onError(error) {
                console.log(error);
            }
        })
    }, [ readDirectMessageMutation ])

    const currentDate = useRef("");
    const chatDetails = useMemo(() => {
        if(data) {
            currentDate.current = "";
            chatIDRef.current = data.directChat.ID;

            return data.directChat;
        }
        return { messages: [] };
    }, [ data ]);

    const friendshipDate = useMemo(() => {
        if(chatDetails.datetime) return moment(new Date(parseInt(chatDetails.datetime))).format("DD-MM-YYYY");
        return "";
    }, [ chatDetails ]);

    useEffect(() => {
        if(Boolean(data) && mainRef.current) {
            const scrollHeight = mainRef.current.scrollHeight;
            mainRef.current.scroll({ behavior: "smooth", top: scrollHeight })
        }
    }, [ data ]);
    
    const hasRepliedMessage = useMemo(() => {
        return Object.keys(repliedMessage).length > 0 && repliedMessage.isDirectChat;
    }, [ repliedMessage ]);
    
    const sendDirectMessage = useCallback(({ inputRef, imageRef }) => {
        const send = sendDirectMessageMutation[0];

        send({ variables: {
            messageInput: {
                chatID: chatIDRef.current,
                destinatary: destinataryRef.current,
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
                console.log(err)
            }
        })

    }, [ hasRepliedMessage, repliedMessage, setRepliedMessage, sendDirectMessageMutation ]);

    const textfieldContainer = useMemo(() => <TextfieldContainer sendHandler={sendDirectMessage} />, [ sendDirectMessage ]);

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
            if(message.sender !== username && !message.isRead) {
                return true;
            }

            return false;
        })
    }, [])

    useEffect(() => {
        const hasUser = Boolean(loggedUser);
        const hasData = Boolean(data);
        if(hasUser && hasData) {
            if(hasUnreadMessages(data.directChat.messages, loggedUser.username)) {
                makeMessagesAsRead(data.directChat.ID);

            }
        }
    }, [ data, hasUnreadMessages, makeMessagesAsRead, loggedUser ]);
    
    return (
        <div 
            className={classNames("flex flex-col grow h-screen items-stretch pb-[5rem]")}>
            <Head>
                <meta name="theme-color" content="#2597BB" />
                <title>{ destinatary.name } | Chat</title>
            </Head>
            <header className="bg-cyan-700 py-2 fixed left-0 top-0 w-full z-10">
                <div className="flex items-center">
                    <Link href="/?tab=chat">
                        <a>
                            <IconButton>
                                <ArrowBackIcon className="text-slate-100" />
                            </IconButton>
                        </a>
                    </Link>
                    <div className="flex flex-col">
                        <Typography 
                            className="text-slate-100" 
                            component="h1">
                            { destinatary.name }
                        </Typography>
                        <Typography 
                            className="mt-1 text-slate-300" 
                            component="p">
                            { destinatary.isOnline ? "online" : "offline" }
                        </Typography>
                    </div>
                </div>
            </header>
            <main className="flex h-full items-stretch flex-col chat__main" ref={mainRef}>
                <div className="grow pt-4">
                    <div>
                        <Typography className="text-center" component="h2">
                            Friends since<br />{ friendshipDate }
                        </Typography>
                    </div>
                    <div className="flex flex-col items-stretch px-4 pt-6">
                        {
                            chatDetails.messages.map((item, index) => {
                                if(isDateChanged(item.createdAt)) {
                                    return (
                                        <div className="flex flex-col items-stretch" key={index}>
                                            <div className="flex justify-center mb-4">
                                                <Typography className="font-semibold">
                                                    { getOnlyDate(new Date(parseInt(item.createdAt))) }
                                                </Typography>
                                            </div>
                                            <MessageCard { ...item } chatIDRef={chatIDRef} dest={dest} message={item} />
                                        </div>
                                    );
                                }
                                return <MessageCard key={index} { ...item } chatIDRef={chatIDRef} dest={dest} message={item} />
                            })
                        }
                    </div>
                </div>
                { textfieldContainer }
            </main>
        </div>
    );
};

export default DirectChatContainer;