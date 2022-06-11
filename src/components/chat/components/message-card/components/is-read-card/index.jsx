import { Avatar, List, ListItem, Popover } from "@mui/material"
import { useCallback, useId, useMemo, useState } from "react"
import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

import ReportCard from "../report-card"

library.add(faCheckDouble);


const Card = ({ isDeleted, isLoggedUser, isRead, message }) => {
    const [ anchorEl, setAnchorEl] = useState(null);
    console.log(isRead)
    const counterID = useId();

    const onHoverHandler = useCallback(event => {
        setAnchorEl(event.currentTarget)
    }, []);

    const isTotallyRead = useMemo(() => {
        const result = isRead.find(report => report.isRead === false);
        return result ? false : true;
    }, [ isRead ])

    const iconMemo = useMemo(() => (
        <FontAwesomeIcon 
            className={classNames(isLoggedUser ? "ml-2" : "mr-2", isTotallyRead ? "text-cyan-500" : "text-slate-500", { "hidden": isDeleted })}
            icon="fa-solid fa-check-double" 
            onMouseEnter={onHoverHandler}
        />
    ), [ isDeleted, isLoggedUser, isTotallyRead, onHoverHandler ])

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? `message-read-popover-${counterID}` : undefined;

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    
    return (
        <>
            { iconMemo }
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
                <List className={classNames("px-2 min-w-[230px] max-w-[260px]")}>
                    {
                        message.isRead.map(report => (
                            <ReportCard key={`${counterID}${report.username}`} { ...report } />
                        ))
                    }
                    
                </List>
            </Popover>
        </>
    );
};

export default Card;