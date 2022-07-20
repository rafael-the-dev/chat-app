import { useCallback, useState } from 'react';
import { useMutation } from "@apollo/client";

import { IconButton } from "@mui/material"
import { SEND_DIRECT_MESSAGE } from "src/graphql/mutations";
import CircularProgress from '@mui/material/CircularProgress';

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const Input = ({ closeInput, username }) => {
    const sendMutation = useMutation(SEND_DIRECT_MESSAGE);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ value, setValue ] = useState("");

    const onChangeHandler = useCallback(event => setValue(event.target.value), []);

    const submitHandler = useCallback((event) => {
        event.preventDefault();

        setIsLoading(true);
        const send = sendMutation[0];

        send({
            variables: {
                messageInput: {
                    chatID: "",
                    destinatary: username,
                    image: null,
                    isForwarded: false,
                    reply: "",
                    text: value
                }
            },
            onCompleted() {
                closeInput();
                setIsLoading(false);
                setValue("");
            },
            onError(error) {
                setIsLoading(false);
                setValue("")
                console.error(error);
            }
        })
    }, [ closeInput, sendMutation, value, username ]);

    return (
        <form 
            className="bg-white flex items-center mt-3 mb-1 py-1 dark:bg-stone-400"
            onSubmit={submitHandler}>
            <input 
                className="bg-transparent border-0 grow outline-none py-1 px-3 text-base"
                placeholder="Insert quick message"
                onChange={onChangeHandler}
                value={value}
            />
            { isLoading ? <CircularProgress className="text-slate-100" size={25} /> : (
                Boolean(value.trim()) ?
                    <IconButton>
                        <SendIcon className="text-blue-500" />
                    </IconButton> :
                    <IconButton type="button" onClick={closeInput}>
                        <CloseIcon className="text-red-500" />
                    </IconButton> 
                )
            }
        </form>
    );
};

export default Input;