import { IconButton, Typography } from "@mui/material"
import classNames from 'classnames';
import { useCallback, useContext, useMemo } from "react";

import CloseIcon from '@mui/icons-material/Close';

import { ChatContext, LoginContext } from "src/context";

const RepliedMessage = () => {
    const { loggedUser } = useContext(LoginContext);
    const { repliedMessage, setRepliedMessage } = useContext(ChatContext);

    const closeHandler = useCallback(() => setRepliedMessage({}), [ setRepliedMessage ]);

    const isLoggedUserSender = useMemo(() => repliedMessage.sender === loggedUser.username, [ loggedUser, repliedMessage ]);

    return (
        <div className={classNames(`border-l-4 border-solid flex flex-col bg-slate-50 mx-3 
            mb-3 p-1 pl-2 rounded-lg`, 
            isLoggedUserSender ? "border-cyan-700" : "border-red-500")}>
            <IconButton className="p-1 self-end" onClick={closeHandler}>
                <CloseIcon className="text-sm text-red-500" />
            </IconButton>
            <Typography className={ "text-cyan-700" } component="h2">
                { isLoggedUserSender ? "You" : repliedMessage.sender }
            </Typography>
            <Typography className="text-base text-slate-500" component="p">
                { repliedMessage.text }
            </Typography>
        </div>
    );
};

export default RepliedMessage;