import { useCallback, useEffect, useMemo, useState } from "react"
import { Popover } from "@mui/material"

const PopoverContainer = ({ children, id, onClickRef, onCloseRef }) => {
    const [ anchorEl, setAnchorEl] = useState(null);

    const openPopover = Boolean(anchorEl);
    const popoverID = openPopover ? `${id}-popover` : undefined;

    const childrenMemo = useMemo(() => <>{ children }</>, [ children ])

    const handleClose = useCallback(event => {
        event && event.stopPropagation();
        setAnchorEl(null);
    }, []);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    useEffect(() => {
        onClickRef.current = handleClick;
    }, [ handleClick, onClickRef ]);

    useEffect(() => {
        if(onCloseRef)
            onCloseRef.current = handleClose;
    }, [ handleClose, onCloseRef ])

    return (
        <Popover
            id={popoverID}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            classes={{ paper: ""}}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            { childrenMemo }
        </Popover>
    );
};

export default PopoverContainer;