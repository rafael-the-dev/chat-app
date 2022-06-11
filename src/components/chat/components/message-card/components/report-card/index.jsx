import { Avatar, ListItem, Typography } from "@mui/material"
import classNames from "classnames"
import { useContext, useMemo } from "react"

import { AppContext } from 'src/context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckDouble);


const ReportCard = ({ isRead, username }) => {
    const { getUsersList } = useContext(AppContext);

    const targetUser = useMemo(() => {
        const result = getUsersList().find(user => user.username === username );

        if(result) return result;
        return { image: "", name: "", username: "" }

    }, [ getUsersList, username ]);

    return (
        <ListItem className="mb-2 last:mb-0" disablePadding>
            <div className={classNames("flex items-center w-full")}>
                <Avatar 
                    className="h-[25px] text-base w-[25px]"
                    src={targetUser.image ? `http://localhost:5000/${targetUser.image}` : ""}>
                </Avatar>
                <Typography 
                    className={classNames("font-semibold grow ml-3 max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                    component="h2">
                    { targetUser.name }
                </Typography>
                <FontAwesomeIcon 
                    className={classNames(isRead ? "text-cyan-500" : "text-slate-500", "ml-2")}
                    icon="fa-solid fa-check-double" 
                />
            </div>
        </ListItem>
    );
};

export default ReportCard;