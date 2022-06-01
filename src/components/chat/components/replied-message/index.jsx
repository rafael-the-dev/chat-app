import { Typography } from "@mui/material"
import classNames from 'classnames';
import { useCallback, useContext, useMemo } from "react";

import { LoginContext } from "src/context";

const RepliedMessage = ({ ID, image, sender, text }) => {

    const { loggedUser } = useContext(LoginContext);

    const isLoggedUserSender = useMemo(() => sender === loggedUser.username, [ loggedUser, sender ]);

    const clickHandler = useCallback(() => {
        const mainTag = document.querySelector(".chat__main");
        const repliedElement = document.querySelector(`[data-id="${ID}"]`);//)

        const scrollHeight = repliedElement.offsetTop - ( repliedElement.scrollHeight * 3 );
        mainTag.scroll({ behavior: "smooth", top: scrollHeight })
    }, [ ID ])

    return (
        <div className={classNames(`border-l-4 border-solid flex flex-col bg-slate-50 
            mb-3 p-1 px-2 rounded-lg`, 
            isLoggedUserSender ? "border-cyan-700" : "border-red-500")}
            onClick={clickHandler}>
            <Typography className={ "text-cyan-700" } component="h2">
                { isLoggedUserSender ? "You" : sender }
            </Typography>
            <Typography className="text-base text-slate-500" component="p">
                { text }
            </Typography>
        </div>
    );
};

export default RepliedMessage;