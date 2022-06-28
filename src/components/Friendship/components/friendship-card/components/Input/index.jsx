import { useCallback, useState } from 'react'

import { IconButton } from "@mui/material"

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const Input = ({ closeInput }) => {
    const [ value, setValue ] = useState("");

    const onChangeHandler = useCallback(event => setValue(event.target.value), [])

    return (
        <form className="bg-cyan-300 flex items-center mt-3 mb-1 py-1 dark:bg-stone-400">
            <input 
                className="bg-transparent border-0 grow outline-none py-1 px-3 text-base"
                placeholder="Insert quick message"
                onChange={onChangeHandler}
            />
            { Boolean(value.trim()) ?
                <IconButton>
                    <SendIcon className="text-blue-500" />
                </IconButton> :
                <IconButton onClick={closeInput}>
                    <CloseIcon className="text-red-500" />
                </IconButton> 
            }
        </form>
    );
};

export default Input;