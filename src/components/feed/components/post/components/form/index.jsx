import { useCallback, useRef } from "react"
import { IconButton, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import Emojis from "src/components/emojis-popover"
import Button from "./components/send-button"

const CustomTextfield = styled(TextField)({
    '& .MuiOutlinedInput-input': {
        padding: '7.5px 8px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    }
});

const Form = ({ ID }) => {
    const handleClick = useRef(null);
    const inputRef = useRef(null);
    const buttonSetValue = useRef(null);
    const onSubmit = useRef(null);

    const changeHandler = useCallback(event => {
        const inputValue = event.target.value;
        buttonSetValue.current?.(currentValue => {
            if(currentValue.length === 0) {
                return inputValue;
            } else if(currentValue.length > 0 && inputValue.length === 0) {
                return inputValue;
            }

            return currentValue;
        })
    }, [])

    return (
        <form 
            className="border-t border-solid border-slate-200 flex items-center mt-4 pl-4 pr-3 py-2"
            onSubmit={event => onSubmit.current?.(event)}>
            <IconButton onClick={event => handleClick.current?.(event)}>
                <InsertEmoticonIcon />
            </IconButton>
            <CustomTextfield 
                className="border-0 grow py-0"
                inputRef={inputRef}
                onChange={changeHandler}
                placeholder="Add a comment..."
            />
            <Button 
                buttonSetValue={buttonSetValue}
                ID={ID}
                inputRef={inputRef} 
                onSubmit={onSubmit}
            />
            <Emojis 
                handleClick={handleClick} 
                inputRef={inputRef}
            />
        </form>
    );
};

export default Form;