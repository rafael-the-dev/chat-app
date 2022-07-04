import { IconButton, Typography } from "@mui/material"
import { useContext, useMemo } from "react";
import Link from "next/link"

import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"
import { getDate } from "src/helpers"

import Avatar from "src/components/avatar"
import LikeButton from "./components/like-button"

const Card = ({ comment, createdAt, likes, username }) => {
    const { getUsersList } = useContext(AppContext);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username }), [ getUsersList, username ]);
    
    return (
        <li className="flex mb-3 last:mb-0">
            <Avatar { ...details } />
            <div className="grow pl-4">
                <div className="flex items-center justify-between">
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
                    <LikeButton likes={likes} />
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