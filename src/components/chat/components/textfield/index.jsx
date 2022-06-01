import { Collapse, IconButton } from "@mui/material"
import { useRouter } from "next/router"
import { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { Typography } from "@mui/material"
import classNames from "classnames"

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PhotoIcon from '@mui/icons-material/Photo';
import SendIcon from '@mui/icons-material/Send';

import { ChatContext } from "src/context";
import RepliedMessage from "./components/replied-message"


const TextfieldContainer = ({ sendHandler }) => {
    const router = useRouter();
    const { page } = router.query;
    
    const { repliedMessage } = useContext(ChatContext);

    const [ expanded, setExpanded ] = useState(false);
    const [ canISubmit, setCanISubmit ] = useState(false);
    const inputRef = useRef(null);

    const changeHandler = useCallback(event => {
        const value = event.target.value;

        setCanISubmit(Boolean(value));
    }, []);

    const toggleExpanded = useCallback(() =>  setExpanded(b => !b), []);

    const repliedMessageMemo = useMemo(() => <RepliedMessage />, [])

    const emojiButtonMemo = useMemo(() => (
        <IconButton type="button" onClick={toggleExpanded}>
            { expanded ? <CloseIcon  className="hover:text-cyan-600" /> : <AddIcon className="hover:text-cyan-600" /> }
        </IconButton>
    ),[ expanded, toggleExpanded ])

    const inputMemo = useMemo(() => (
        <input 
                className="bg-transparent grow p-2 text-base focus:outline-cyan-600"
                onChange={changeHandler}
                ref={inputRef}
            />
    ), [ changeHandler ]);

    const collapseMemo = useMemo(() => (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className="bg-cyan-300 flex items-center flex-wrap">
                <IconButton className="mr-1 ">
                    <InsertEmoticonIcon  className="hover:text-cyan-600" />
                </IconButton>
                <IconButton>
                    <PhotoIcon  className="hover:text-cyan-600" />
                </IconButton>
            </div>
        </Collapse>
    ), [ expanded ])

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
            { collapseMemo }
        </div>
    );
};

export default TextfieldContainer;