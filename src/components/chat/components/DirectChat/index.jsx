import Head from "next/head"
import Link from "next/link"
import { useCallback, useContext, useMemo, useRef } from "react"
import { useRouter } from "next/router"
import { IconButton, Typography } from "@mui/material"
import { useMutation } from "@apollo/client"
import moment from 'moment'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextfieldContainer from "../textfield";

import { LoginContext } from "src/context/LoginContext"
import { useDirectChatQuery, useUserQuery } from "src/hooks"

import { SEND_DIRECT_MESSAGE } from "src/graphql/mutations"
import MessageCard from '../message-card'

const DirectChatContainer = () => {
    const router = useRouter();
    const { dest, id } = router.query;

    const sendDirectMessageMutation = useMutation(SEND_DIRECT_MESSAGE)

    const { user } = useContext(LoginContext)

    const destinataryResult = useUserQuery({ dest, user });
    const { data } = useDirectChatQuery({ dest, id, loggedUser: user });

    const chatIDRef = useRef("");
    const destinataryRef = useRef("");

    const destinatary = useMemo(() => {
        if(destinataryResult.data)  {
            destinataryRef.current = destinataryResult.data.user.username;
            return destinataryResult.data.user;
        }
        return {};
    }, [ destinataryResult ])

    const chatDetails = useMemo(() => {
        if(data) {
            chatIDRef.current = data.directChat.ID;
            return data.directChat;
        }
        return { messages: [] };
    }, [ data ]);

    const friendshipDate = useMemo(() => {
        if(chatDetails.datetime) return moment(new Date(parseInt(chatDetails.datetime))).format("DD-MM-YYYY");
        return "";
    }, [ chatDetails ]);

    
    const sendDirectMessage = useCallback(({ inputRef }) => {
        const send = sendDirectMessageMutation[0];

        send({ variables: {
            messageInput: {
                chatID: chatIDRef.current,
                destinatary: destinataryRef.current,
                image: "",
                isForwarded: false,
                reply: "",
                text: inputRef.current.value
            }},
            onCompleted() {
                inputRef.current.value = "";
            },
            onError(err) {
                console.log(err)
            }
        })

    }, [ sendDirectMessageMutation ]);

    const textfieldContainer = useMemo(() => <TextfieldContainer sendHandler={sendDirectMessage} />, [])

    return (
        <div className="flex flex-col grow h-screen items-stretch pb-[5rem]">
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
                            online
                        </Typography>
                    </div>
                </div>
            </header>
            <main className="flex h-full items-stretch flex-col chat__main">
                <div className="grow pt-4">
                    <div>
                        <Typography className="text-center" component="h2">
                            Friends since<br />{ friendshipDate }
                        </Typography>
                    </div>
                    <div className="flex flex-col items-stretch px-4 pt-6">
                        {
                            chatDetails.messages.map((item, index) => <MessageCard key={index} { ...item } />)
                        }
                    </div>
                </div>
                { textfieldContainer }
            </main>
        </div>
    );
};

export default DirectChatContainer;