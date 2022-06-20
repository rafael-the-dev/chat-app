import Image from "next/image"
import { IconButton, Popover, Typography } from "@mui/material"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { AppContext, LoginContext } from "src/context";

import Form from "./components/form"

const UserDetails = ({ clickHandler, username }) => {
    const { getFriendshipInvitationsList, getUsersList, serverPublicURL } = useContext(AppContext);
    const { loggedUser } = useContext(LoginContext)
    const [ anchorEl, setAnchorEl ] = useState(null);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? `${username}-details-popover` : undefined;

    const imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgJ0SYGF5qAueA_nbIYvUB58DCZ2KG-DkYA&usqp=CAU";

    const myLoader=({src})=>{
        return `${serverPublicURL.current}/${userDetails.image}`;
    };

    const userDetails = useMemo(() => {
        const result = getUsersList().find(user => user.username === username);

        if(result) return result;

        return { image: "", name: "", username: "" }
    }, [ getUsersList,  username ]);

    const form = useMemo(() => <Form username={userDetails.username} />, []);

    const handleClose = useCallback(event => {
        event.stopPropagation();
        setAnchorEl(null);
    }, []);

    useEffect(() => {
        clickHandler.current = event => {
            if(loggedUser.username !== username) {
                setAnchorEl(event.currentTarget);
            }
        }
    }, [ clickHandler, loggedUser, username ])

    return (
        <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            classes={{ paper: ""}}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <article className="flex">
                    <Image 
                        alt={userDetails.name}
                        height={170}
                        loader={myLoader}
                        src={userDetails.image ? `${serverPublicURL.current}/${userDetails.image}` : imageURL }
                        unoptimized={true}
                        width={170}
                    />
                <div className="p-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography
                                className="font-bold overflow-hidden text-xl text-ellipsis whitespace-nowrap w-[200px]"
                                component="h3">
                                { userDetails.name }
                            </Typography>
                            <Typography 
                                className="text-sm overflow-hidden text-ellipsis whitespace-nowrap w-[200px]" 
                                component="p">
                                @{ userDetails.username }
                            </Typography>
                        </div>
                        <IconButton>
                            <PersonAddAltIcon className="text-cyan-500" />
                        </IconButton>
                    </div>
                    { form }
                </div>
            </article>
        </Popover>
    );
};

export default UserDetails;