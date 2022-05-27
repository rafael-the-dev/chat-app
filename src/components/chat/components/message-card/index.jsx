import { Avatar, IconButton, Typography } from '@mui/material'
import classNames from 'classnames';
import { useContext } from 'react';
import { AppContext } from 'src/context/AppContext';
import { LoginContext } from 'src/context/LoginContext';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { getDate } from "src/helpers"

const Container = ({ createdAt, image, sender, text }) => {
    const { user } = useContext(LoginContext)
    const { getInitialsNameLetters, serverPublicURL } = useContext(AppContext);

    return (
        <article className={classNames("flex mb-4 w-full", user.username === sender ? "justify-end" : "")}>
            <div className={classNames("flex items-end")}>
                <Avatar 
                    className={classNames("mb-4", { "hidden": user.username === sender })}>
                    { getInitialsNameLetters(user ? user.name : "" )}
                </Avatar>
                <div className={classNames("", { "ml-3": user.username !== sender})}>
                    <div className={classNames("flex flex-col min-w-[120px] pt-1 pb-3 px-4 rounded-2xl", user.username !== sender ? "other-message rounded-bl-none": "user-message rounded-br-none")}>
                        <IconButton className="p-0 self-end">
                            <MoreHorizIcon />
                        </IconButton>
                        <Typography>
                            { text }
                        </Typography>
                    </div>
                    <Typography className={classNames("mt-[4px] text-xs text-slate-300", user.username !== sender ? "" : "text-right")}>
                        { getDate(new Date(parseInt(createdAt))) }
                    </Typography>
                </div>
            </div>
        </article>
    );
};

export default Container;