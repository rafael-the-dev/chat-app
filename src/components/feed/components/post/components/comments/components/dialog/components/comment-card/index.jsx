import { IconButton, Typography } from "@mui/material"
import { useContext, useMemo } from "react";
import Link from "next/link"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"
import { getDate } from "src/helpers"

import Avatar from "src/components/avatar"


const Card = ({ comment, createdAt, username }) => {
    const { getUsersList } = useContext(AppContext);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username }), [ getUsersList, username ]);
    
    return (
        <li className="flex mb-3 last:mb-0">
            <Avatar { ...details } />
            <div className="pl-4">
                <div>
                    <Typography
                        className="flex"
                        component="p">
                        <Link href={`profile?username=${details.username}`}>
                            <a className="mr-2">
                                <Typography 
                                    className="font-semibold text-zinc-600 text-sm hover:text-red-500"
                                    component="h2">
                                    { details.username }
                                </Typography>
                            </a>
                        </Link>
                        { comment }
                    </Typography>
                </div>
                <Typography
                    className="text-[.85rem] text-zinc-600"
                    component="p">
                    { getDate(new Date(parseInt(createdAt))) }
                </Typography>
            </div>
        </li>
    );
};

export default Card;