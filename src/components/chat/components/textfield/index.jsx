import { IconButton } from "@mui/material"
import { useRouter } from "next/router"
import { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { Typography } from "@mui/material"
import classNames from "classnames"

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';

import { ChatContext } from "src/context";
import RepliedMessage from "./components/replied-message"


const TextfieldContainer = ({ sendHandler }) => {
    const router = useRouter();
    const { page } = router.query;
    
    const { repliedMessage } = useContext(ChatContext);

    const [ canISubmit, setCanISubmit ] = useState(false);
    const inputRef = useRef(null);

    const changeHandler = useCallback(event => {
        const value = event.target.value;

        setCanISubmit(Boolean(value));
    }, []);

    const repliedMessageMemo = useMemo(() => <RepliedMessage />, [])

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
        sendHandler({ inputRef })
    }, [ sendHandler ]);

    const hasRepliedMessage = useMemo(() => Object.keys(repliedMessage).length > 0, [ repliedMessage ]);

    return (
        <div className={classNames(`bottom-20 flex flex-col fixed items-stretch w-full z-10`,
            { "bg-cyan-300 py-2": hasRepliedMessage })}>
            { hasRepliedMessage && repliedMessageMemo }
            <form 
                className="bg-cyan-300 flex items-center w-full"
                onSubmit={submitHandler}>
                { emojiButtonMemo }
                { inputMemo }
                { submitButtonMemo }
            </form>
        </div>
    );
};

export default TextfieldContainer;