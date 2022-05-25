import Head from "next/head"
import Link from "next/link"
import { useContext, useMemo } from "react"
import { useRouter } from "next/router"
import { IconButton, Typography } from "@mui/material"
import moment from 'moment'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextfieldContainer from "../textfield";

import { LoginContext } from "src/context/LoginContext"
import { useDirectChatQuery, useUserQuery } from "src/hooks"

const DirectChatContainer = () => {
    const router = useRouter();
    const { dest, id } = router.query;

    const { user } = useContext(LoginContext)

    const destinataryResult = useUserQuery({ dest, user });
    const { data } = useDirectChatQuery({ dest, id, loggedUser: user });

    const destinatary = useMemo(() => {
        if(destinataryResult.data) return destinataryResult.data.user
        return {};
    }, [ destinataryResult ])

    const chatDetails = useMemo(() => {
        if(data) return data.directChat;
        return {};
    }, [ data ]);

    const friendshipDate = useMemo(() => {
        if(chatDetails.datetime) return moment(new Date(parseInt(chatDetails.datetime))).format("DD-MM-YYYY");
        return "";
    }, [ chatDetails ])

    return (
        <div className="flex flex-col grow h-screen items-stretch pb-[5rem]">
            <Head>
                <meta name="theme-color" content="#2597BB" />
                <title> | Chat</title>
            </Head>
            <header className="bg-cyan-700 py-2">
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
            <main className="flex grow items-stretch flex-col ">
                <div className="grow pt-4">
                    <div>
                        <Typography className="text-center" component="h2">
                            Friends since<br />{ friendshipDate }
                        </Typography>
                    </div>
                </div>
                <TextfieldContainer />
            </main>
        </div>
    );
};

export default DirectChatContainer;