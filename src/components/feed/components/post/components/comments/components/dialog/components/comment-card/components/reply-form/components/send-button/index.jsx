import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { useMutation } from "@apollo/client"
import { CircularProgress, IconButton } from "@mui/material"

import SendIcon from '@mui/icons-material/Send';

import { REPLY_COMMENT } from "src/graphql/mutations"

const Button = ({ buttonSetValue, commentID, id, inputRef, onSubmit, replyingTo }) => {
    const replyMutation = useMutation(REPLY_COMMENT);

    const [ loading, setLoading ] = useState(false);
    const [ value, setValue ] = useState("");
    const [ isPending, startTransition ] = useTransition();
    const loadingRef = useRef(false);


    const submitHandler = useCallback(event => {
        event.preventDefault();
        const comment = inputRef.current.value;

        if(loadingRef.current || !Boolean(comment)) {
            return;
        }

        setLoading(true);
        const reply = replyMutation[0];

        reply({
            variables: {
                comment,
                commentID,
                id,
                replyingTo
            },
            onCompleted() {
                inputRef.current.value = "";
                setLoading(false);
                startTransition(() => setValue(""))
            },
            onError(error) {
                console.error(error)
                setLoading(false)
            }
        })

    }, [ commentID, id, inputRef, replyingTo, replyMutation ]);

    useEffect(() => {
        buttonSetValue.current = setValue;
    }, [ buttonSetValue ]);

    useEffect(() => {
        onSubmit.current = submitHandler;
    }, [ onSubmit, submitHandler ]);

    useEffect(() => {
        loadingRef.current = loading;
    }, [ loading ])

    return (
        <IconButton
            disabled={loading || !Boolean(value)}>
            { loading ? <CircularProgress size={20} /> : <SendIcon /> }
        </IconButton>
    );
};

export default Button;