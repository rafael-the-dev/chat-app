import { AvatarGroup, Button, Typography } from "@mui/material"
import { useId, useMemo } from "react"
import Link from "next/link"

import Avatar from "./components/avatar"

const Likes = ({ likes }) => {
    const id = useId();

    const randomUser = useMemo(() => likes[Math.floor(Math.random() * likes.length)], [ likes ]);

    if(likes.length === 0) return <></>;

    return (
        <div className="flex items-center mb-1 px-2">
            <AvatarGroup total={ likes.length }>
                {
                    likes.slice(0, 4).map(like => <Avatar key={`${id}-${like.username}`} { ...like} />)
                }
            </AvatarGroup>
            <div className="flex items-center ml-3">
                <Typography 
                    className=" font-medium mr-2 text-black"
                    component="p">
                    liked by
                </Typography>
                <Link href={`profile?username=${randomUser.username}`}>
                    <a>
                        <Typography 
                            className="font-medium text-black"
                            component="p">
                            { randomUser.username }
                        </Typography>
                    </a>
                </Link>
                {
                    likes.length > 1 && (
                        <>
                            <Typography 
                                className=" font-medium ml-2 text-black"
                                component="p">
                                and
                            </Typography>
                            <Button className="lowercase py-0 text-black">others</Button>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Likes;