import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useMutation } from "@apollo/client"

import { ADD_COMMENT } from "src/graphql/mutations"

const CustomButton = styled(Button)({
    "&.Mui-disabled": {
        color: "#94a3b8"
    }
})


const SendButton = ({ buttonSetValue, ID, inputRef, onSubmit }) => {
    const addCommentMutation = useMutation(ADD_COMMENT);

    const [ loading, setLoading ] = useState(false);
    const [ value, setValue ] = useState("");
    const [ isPending, startTransition ] = useTransition();
    const loadingRef = useRef(false)

    const submitHandler = useCallback(event => {
        event.preventDefault();
        const comment = inputRef.current.value;

        if(loadingRef.current || !Boolean(comment)) {
            return;
        }

        setLoading(true);
        const addComment = addCommentMutation[0];

        addComment({
            variables: {
                comment,
                id: ID
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

    }, [ addCommentMutation, ID, inputRef ])

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
        <CustomButton
            disabled={loading || !Boolean(value)}
            type="submit">
            { loading ? "Posting..." : "Post"}
        </CustomButton>
    );
};

export default SendButton;