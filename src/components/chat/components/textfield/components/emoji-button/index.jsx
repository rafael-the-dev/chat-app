import { useState } from "react"
import { Collapse, IconButton } from "@mui/material"
import Picker from 'emoji-picker-react';

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const Button = () => {
    const [ expanded, setExpanded ] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        //setChosenEmoji(emojiObject);
    };

    const onClickHandler = () => setExpanded(b => !b);

    return (
        <div className="flex flex-col">
            <IconButton className="mr-1 " onClick={onClickHandler}>
                <InsertEmoticonIcon  className="hover:text-cyan-600" />
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Picker onEmojiClick={onEmojiClick} />
            </Collapse>
        </div>
    );
};

export default Button;