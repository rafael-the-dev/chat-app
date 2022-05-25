import Head from "next/head"
import { useRouter } from "next/router"
import { IconButton, Typography } from "@mui/material"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextfieldContainer from "../textfield";

const DirectChatContainer = () => {
    const router = useRouter();
    const { dest, id } = router;

    return (
        <>
            <Head>
                <title> | Chat</title>
            </Head>
            <header>
                <div className="flex items-center">
                    <IconButton>
                        <ArrowBackIcon className="text-slate-100" />
                    </IconButton>
                    <div className="flex flex-col">
                        <Typography 
                            className="text-slate-100" 
                            component="h1">
                            Mira Vicente
                        </Typography>
                        <Typography 
                            className="mt-1 text-slate-200" 
                            component="p">
                            online
                        </Typography>
                    </div>
                </div>
            </header>
            <main className="flex items-stretch flex-col ">
                <div className="grow"></div>
                <TextfieldContainer />
            </main>
        </>
    );
};

export default DirectChatContainer;