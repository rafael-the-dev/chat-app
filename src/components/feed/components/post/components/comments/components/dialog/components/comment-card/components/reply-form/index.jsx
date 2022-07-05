import { useCallback, useEffect, useRef, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"
import Collapse from '@mui/material/Collapse';

import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import Emojis from "src/components/emojis-popover"

const CustomTextfield = styled(TextField)({
    '& .MuiOutlinedInput-input': {
        padding: '7.5px 8px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    }
});

const Container = ({ toggleRef }) => {
    const [ expanded, setExpanded ] = useState(false);

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

    useEffect(() => {
        toggleRef.current = () => setExpanded(b => !b);
    }, [ toggleRef ]);

    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <form className="border border-solid border-slate-200 flex items-center mt-2">
                <CustomTextfield 
                    className="border-0 grow py-0"
                    inputRef={inputRef}
                    onChange={changeHandler}
                    placeholder="Add a comment..."
                />
                <IconButton 
                    type="button"
                    onClick={event => handleClick.current?.(event)}>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                    <SendIcon />
                </IconButton>
                <Emojis 
                    handleClick={handleClick} 
                    inputRef={inputRef}
                />
            </form>
        </Collapse>
    );
};

export default Container;