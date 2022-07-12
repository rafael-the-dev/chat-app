import { useCallback, useId, useMemo } from "react";
import dynamic from "next/dynamic";

import Popover from "src/components/popover"

const NoSSREmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const EmojisPopover = ({ handleClick, inputRef }) => {
    const ID = useId();

    const onEmojiClick = useCallback((event, emojiObject) => {
        inputRef.current.value = inputRef.current.value + emojiObject.emoji;
    }, [ inputRef ]);

    const emojisMemo = useMemo(() => <NoSSREmojiPicker onEmojiClick={onEmojiClick} />, [ onEmojiClick ])

    return (
        <Popover
            id={`${ID}-emojis`}
            onClickRef={handleClick}
        >
            <div className="w-[350px]">
                { emojisMemo }
            </div>
        </Popover>
    );
};

export default EmojisPopover;