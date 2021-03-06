import Image from "next/image"
import { Chip, IconButton, Typography } from "@mui/material"
import { useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { styled } from '@mui/material/styles'
import classes from "./styles.module.css"
import classNames from "classnames"
import Link from "next/link"

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { AppContext, LoginContext } from "src/context";
import { getURL } from "src/helpers"

import Form from "./components/form"
import Dialog from "src/components/Friendship/components/user-card/components/dialog"
import Popover from "src/components/popover";

const CustomImage = styled(Image)({
    '&': {
        height: 'auto !important',
        maxHeight: 'unset !important',
        width: '100% !important'
    }
})

const UserDetails = ({ clickHandler, username }) => {
    const { getFriendshipsList, getFriendshipInvitationsList, getUsersList, serverPublicURL } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext);
    const onClickRef = useRef(null);

    const imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgJ0SYGF5qAueA_nbIYvUB58DCZ2KG-DkYA&usqp=CAU";

    const myLoader=({src})=>{
        return `${serverPublicURL.current}/${userDetails.image}`;
    };

    const userDetails = useMemo(() => {
        const result = getUsersList().find(user => user.username === username);

        if(result) return result;

        return { image: "", name: "", username: "" }
    }, [ getUsersList,  username ]);

    const isMyFriend = useMemo(() => {
        const result = getFriendshipsList().find(user => user.username === username);
        return Boolean(result);
    }, [ getFriendshipsList, username ]);

    const hasInvitationSent = useMemo(() => {
        return getFriendshipInvitationsList().find(invitation => {
            const filters = [ username, loggedUser.username ];
            return filters.includes(invitation.sender.username) && filters.includes(invitation.target.username);
        })
    }, [ getFriendshipInvitationsList, loggedUser, username ])

    const form = useMemo(() => <Form username={userDetails.username} />, [ userDetails ]);

    const openDialog = useRef(null);
    const openDialogHandler = useCallback(() => openDialog.current?.(), [])

    useEffect(() => {
        clickHandler.current = event => {
            if(loggedUser.username !== username) {
                onClickRef.current?.(event);
            }
        }
    }, [ clickHandler, loggedUser, username ])

    return (
        <Popover
            id={`${username}-details`}
            onClickRef={onClickRef}
        >
            <article className={classNames(classes.root, "flex flex-col sm:flex-row dark:bg-stone-900")}>
                <CustomImage 
                    alt={userDetails.name}
                    className="bg-black"
                    height={170}
                    loader={myLoader}
                    src={userDetails.image ? getURL({ url: userDetails.image }) : imageURL }
                    unoptimized={true}
                    width={170}
                />
                <div className="p-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography
                                className="font-bold overflow-hidden text-xl text-ellipsis whitespace-nowrap w-[200px] dark:text-slate-300"
                                component="h3">
                                { userDetails.name }
                            </Typography>
                            <Link href={`profile?username=${userDetails.username}`}>
                                <a>
                                <Typography 
                                    className="text-black hover:text-cyan-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap w-[200px] dark:text-slate-400" 
                                    component="p">
                                    @{ userDetails.username }
                                </Typography>
                                </a>
                            </Link>
                        </div>
                        { !isMyFriend && !hasInvitationSent && <IconButton onClick={openDialogHandler}>
                            <PersonAddAltIcon className="text-cyan-500" />
                        </IconButton> }
                        { hasInvitationSent && <Chip color="primary" label="pending" variant="outlined" /> }
                    </div>
                    { form }
                </div>
                <Dialog name={userDetails.name} openDialog={openDialog} username={username}  />
            </article>
        </Popover>
    );
};

export default UserDetails;