import { IconButton, Typography } from "@mui/material"
import { useContext, useMemo } from "react"
import classNames from "classnames"
import classes from "./styles.module.css"
import Link from "next/link"

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Avatar from "src/components/avatar"

import { AppContext, LoginContext } from "src/context";

const Card = ({ admin, username }) => {
    const { getUsersList } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext)

    const isAdmin = admin === username;

    const userDetails = useMemo(() => {
        const result = getUsersList().find(user => user.username === username);

        if(result) return result;

        return { image: "", name: "", username: "" }
    }, [getUsersList,  username ]);

    return (
        <li className={classNames(classes.card, "px-4 w-full last:border-0")}>
            <div
                className={classNames("flex justify-between py-2 text-black w-full")}>
                <div className="flex items-center">
                    <Avatar 
                        image={userDetails.image}
                    />
                    <div className="flex flex-col grow items-stretch ml-3">
                        <Typography 
                            className={classNames(classes.text, "overflow-hidden text-ellipsis whitespace-nowrap")} 
                            component="h3">
                            { userDetails.name }
                        </Typography>
                        <Link href={`profile?username=${userDetails.username}`}>
                            <a>
                                <Typography 
                                    className={classNames(`text-sm overflow-hidden text-ellipsis whitespace-nowrap 
                                    text-black hover:text-cyan-500`, classes.text)} 
                                    component="p">
                                    @{ userDetails.username }
                                </Typography>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center">
                        { isAdmin && <Typography 
                            className={classNames(`border border-solid border-green-500 text-green-500 
                            px-1 py-[3px] text-xs rounded-xl`)} 
                            component="p">
                            admin
                        </Typography> }
                    <IconButton 
                        className="p-2"
                        disabled={ loggedUser.username !== admin }>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
            </div>
        </li>
    );
};

export default Card;