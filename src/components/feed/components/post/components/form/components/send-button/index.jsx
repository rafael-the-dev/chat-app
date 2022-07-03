import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

const CustomButton = styled(Button)({
    "&.Mui-disabled": {
        color: "#94a3b8"
    }
})


const SendButton = ({ buttonSetValue, ID, inputRef, onSubmit }) => {
    const [ loading, setLoading ] = useState(false);
    const [ value, setValue ] = useState("");
    const loadingRef = useRef(false)

    const submitHandler = useCallback(event => {
        event.preventDefault();
        const comment = inputRef.current.value;

        if(loadingRef.current || !Boolean(comment)) {
            return;
        }

        setLoading(true);
    }, [ inputRef ])

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
            disabled={loading || !Boolean(value)}>
            { loading ? "Posting..." : "Post"}
        </CustomButton>
    );
};

export default SendButton;