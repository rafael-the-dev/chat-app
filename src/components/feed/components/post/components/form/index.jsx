import { useRef, useState } from "react"
import { Button, IconButton, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import Emojis from "src/components/emojis-popover"

const CustomTextfield = styled(TextField)({
    '& .MuiOutlinedInput-input': {
        padding: '7.5px 8px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    }
})

const Form = ({ ID }) => {
    const handleClick = useRef(null);
    const inputRef = useRef(null);

    return (
        <form className="border-t border-solid border-slate-200 flex items-center mt-4 pl-4 pr-3 py-2">
            <IconButton onClick={event => handleClick.current?.(event)}>
                <InsertEmoticonIcon />
            </IconButton>
            <CustomTextfield 
                className="border-0 grow py-0"
                inputRef={inputRef}
                placeholder="Add a comment..."
            />
            <Button>Post</Button>
            <Emojis 
                handleClick={handleClick} 
                inputRef={inputRef}
            />
        </form>
    );
};

export default Form;