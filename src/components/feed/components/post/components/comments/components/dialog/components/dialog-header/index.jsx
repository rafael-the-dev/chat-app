import { Avatar, Typography } from "@mui/material"
import { useContext, useMemo } from "react"
import Link from "next/link"

import Header from "src/components/dialog/components/dialog-header"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"


const DialogHeader = ({ author, onClose }) => {
    const { getUsersList, serverPublicURL } = useContext(AppContext);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username: author }), [ getUsersList, author ]);

    return (
        <Header onClose={onClose}>
            <div className="flex items-center pl-4">
                <Avatar 
                    alt={details.name} 
                    className="h-[40px] w-[40px]"
                    src={`${serverPublicURL.current}/${details.image}`} 
                />
                <Link href={`profile?username=${details.username}`}>
                    <a className="ml-3">
                        <Typography 
                            className="font-medium text-black hover:text-red-500 dark:text-slate-400"
                            component="p">
                            { details.name }
                        </Typography>
                    </a>
                </Link>
            </div>
        </Header>
    );
};

export default DialogHeader;