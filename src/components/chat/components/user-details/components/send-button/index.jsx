import { Button } from "@mui/material"
import { useCallback, useContext, useMemo, useRef, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation } from "@apollo/client"

import { AppContext } from "src/context";
import { SEND_DIRECT_MESSAGE } from "src/graphql/mutations";
import { useEffect } from "react";

const SendButton = ({ handler, inputRef, setValue, username, value }) => {
    const { getDirectChats, getFriendshipsList } = useContext(AppContext);

    const sendMutation = useMutation(SEND_DIRECT_MESSAGE);

    const [ isLoading, setIsLoading ] = useState(false);
    const valueRef = useRef("")

    const isMyFriend = useMemo(() => {
        const result = getFriendshipsList().find(user => user.username === username);
        return Boolean(result);
    }, [ getFriendshipsList, username ]);

    const canISubmit = useMemo(() => {
        if(isMyFriend) {
            return !Boolean(value.trim());
        }

        return true;
    }, [ isMyFriend, value ]);

    const chatID = useMemo(() => {
        const result = getDirectChats().find(chat => chat.users.includes(username));

        if(result) return result.ID;

        return "";
    }, [ getDirectChats, username ])

    const submitHandler = useCallback(() => {
        setIsLoading(true);
        const send = sendMutation[0];
        inputRef.current.value = "";

        send({
            variables: {
                messageInput: {
                    chatID,
                    destinatary: username,
                    image: null,
                    isForwarded: false,
                    reply: "",
                    text: valueRef.current
                }
            },
            onCompleted() {
                setIsLoading(false);
                setValue("")
            },
            onError(error) {
                setIsLoading(false);
                setValue("")
                console.error(error);
            }
        })
    }, [ chatID, inputRef, sendMutation, username ]);

    useEffect(() => {
        valueRef.current = value;
    }, [ value ]);

    useEffect(() => {
        handler.current = submitHandler;
    }, [ handler, submitHandler ])

    return (
        <Button
            className="mt-3"
            disabled={canISubmit}
            variant="contained">
            { isLoading ? <CircularProgress className="text-slate-100" size={25} /> : "Send" }
        </Button>
    );
};

export default SendButton;