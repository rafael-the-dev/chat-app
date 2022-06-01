import { Typography } from "@mui/material"
import classNames from 'classnames';
import { useContext, useMemo } from "react";

import { LoginContext } from "src/context";

const RepliedMessage = ({ image, sender, text }) => {

    const { loggedUser } = useContext(LoginContext);

    const isLoggedUserSender = useMemo(() => sender === loggedUser.username, [ loggedUser, sender ]);

    return (
        <div className={classNames(`border-l-4 border-solid flex flex-col bg-slate-50 
            mb-3 p-1 px-2 rounded-lg`, 
            isLoggedUserSender ? "border-cyan-700" : "border-red-500")}>
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