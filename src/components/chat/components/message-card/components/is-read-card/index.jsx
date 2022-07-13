import { List } from "@mui/material"
import { useCallback, useId, useMemo, useRef } from "react"
import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

import ReportCard from "../report-card"
import Popover from "src/components/popover"

library.add(faCheckDouble);


const Card = ({ isDeleted, isLoggedUser, isRead, message }) => {
    const onClickRef = useRef(null);
    const counterID = useId();

    const onHoverHandler = useCallback(event => {
        onClickRef.current?.(event);
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

    return (
        <>
            { iconMemo }
            <Popover
                id={`message-read-popover-${counterID}`}
                onClickRef={onClickRef}
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