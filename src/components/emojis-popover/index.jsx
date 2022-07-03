import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Button, List, Popover } from "@mui/material"
import classNames from "classnames"
import dynamic from "next/dynamic";

const NoSSREmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const EmojisPopover = ({ handleClick, inputRef }) => {
    const [ anchorEl, setAnchorEl] = useState(null);
    const ID = useId();

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? `${ID}-emojis-popover` : undefined;

    const onEmojiClick = useCallback((event, emojiObject) => {
        inputRef.current.value = inputRef.current.value + emojiObject.emoji;
    }, [ inputRef ]);

    const emojisMemo = useMemo(() => <NoSSREmojiPicker onEmojiClick={onEmojiClick} />, [ onEmojiClick ])

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const clickHandler = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    useEffect(() => {
        handleClick.current = clickHandler;
    }, [ clickHandler, handleClick ])

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
            <div className="w-[350px]">
                { emojisMemo }
            </div>
        </Popover>
    );
};

export default EmojisPopover;