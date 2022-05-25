import { IconButton } from "@mui/material"
import { useRouter } from "next/router"
import { useCallback, useMemo, useRef, useState } from 'react'

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';

const TextfieldContainer = () => {
    const router = useRouter();
    const { page } = router.query;

    const [ canISubmit, setCanISubmit ] = useState(false);
    const inputRef = useRef(null);

    const changeHandler = useCallback(event => {
        const value = event.target.value;

        setCanISubmit(Boolean(value));
    }, []);

    const emojiButtonMemo = useMemo(() => (
        <IconButton type="button">
            <InsertEmoticonIcon className="hover:text-cyan-600" />
        </IconButton>
    ),[])

    const inputMemo = useMemo(() => (
        <input 
                className="bg-transparent grow p-2 text-base focus:outline-cyan-600"
                onChange={changeHandler}
                ref={inputRef}
            />
    ), [ changeHandler ]);

    const submitButtonMemo = useMemo(() => (
        <IconButton type="submit" disabled={!canISubmit}>
            <SendIcon className="hover:text-cyan-600" />
        </IconButton>
    ), [ canISubmit ])

    const submitHandler = useCallback(event => {
        event.preventDefault();
    }, [])

    return (
        <form 
            className="bg-cyan-300 flex items-center"
            onSubmit={submitHandler}>
            { emojiButtonMemo }
            { inputMemo }
            { submitButtonMemo }
        </form>
    );
};

export default TextfieldContainer;