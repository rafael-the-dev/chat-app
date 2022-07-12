import { useCallback, useEffect, useState } from "react"
import { Popover } from "@mui/material"

const PopoverContainer = ({ children, id, onClickRef }) => {
    const [ anchorEl, setAnchorEl] = useState(null);

    const openPopover = Boolean(anchorEl);
    const popoverID = openPopover ? `${id}-popover` : undefined;

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    useEffect(() => {
        onClickRef.current = handleClick;
    }, [ handleClick, onClickRef ])

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
            { children }
        </Popover>
    );
};

export default PopoverContainer;