import { AvatarGroup, Hidden, Typography } from "@mui/material"
import { useId, useMemo, useRef } from "react"
import Link from "next/link"

import Avatar from "./components/avatar"
import OthersLikedPost from "./components/likes-dialog"

const Likes = ({ likes }) => {
    const id = useId();
    const randomUserRef = useRef(null);

    const randomUser = useMemo(() => {
        if(randomUserRef.current) {
            return randomUserRef.current;
        } else {
            const result = likes[Math.floor(Math.random() * likes.length)];
            randomUserRef.current = result;
            return result;
        }
    }, [ likes ]);

    if(likes.length === 0) return <></>;

    return (
        <div className="flex items-center mb-1 px-6">
            <AvatarGroup total={ likes.length }>
                {
                    likes.slice(0, 4).map(like => <Avatar key={`${id}-${like.username}`} { ...like} />)
                }
            </AvatarGroup>
            <div className="flex items-center md:ml-3">
                <Hidden mdDown>
                    <Typography 
                        className="mr-2 text-black"
                        component="p">
                        liked by
                    </Typography>
                    <Link href={`profile?username=${randomUser.username}`}>
                        <a>
                            <Typography 
                                className="font-medium text-black hover:text-red-500"
                                component="p">
                                { randomUser.username }
                            </Typography>
                        </a>
                    </Link>
                    {
                        likes.length > 1 && (
                            <>
                                <Typography 
                                    className="ml-2 text-black"
                                    component="p">
                                    and
                                </Typography>
                                <OthersLikedPost likes={likes} />
                            </>
                        )
                    }
                </Hidden>
                <Hidden mdUp>
                    <OthersLikedPost likes={likes} />
                </Hidden>
            </div>
        </div>
    );
};

export default Likes;