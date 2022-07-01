import { Button } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import { useMutation } from "@apollo/client"

import CircularProgress from '@mui/material/CircularProgress';

import { ADD_POST } from "src/graphql/mutations"

const CustomButton = styled(Button)({
    ".dark &.Mui-disabled": {
        backgroundColor: "#78716c"
    }
})

const SendButton = ({ file, inputRef, onError, onSubmit, onSucess, setButtonValue }) => {
    const [ value, setValue ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const addPostMutation = useMutation(ADD_POST);

    const sendHandler = useCallback(() => {
        setIsLoading(true);
        onSubmit();

        const send = addPostMutation[0];

        send({
            variables: {
                post: {
                    description: inputRef.current.value,
                    image: file.image,
                    tags: []
                }
            },
            onCompleted() {
                setIsLoading(false);
                onSucess();
            },
            onError(error) {
                console.error(error)
                setIsLoading(false);
                onError();
            }
        })
    }, [ addPostMutation, file, inputRef, onError, onSubmit, onSucess ])

    useEffect(() => {
        setButtonValue.current = setValue;
    }, [ setButtonValue ])

    return (
        <CustomButton 
            disabled={(!Boolean(file.image) && !Boolean(value.trim())) || isLoading }
            variant="contained"
            type="button"
            className={classNames("border capitalize ml-3 px-8 hover:bg-transparent hover:border-solid hover:text-blue-500 hover:border-blue-500")}
            onClick={sendHandler}>
            { isLoading ? <CircularProgress className="text-white" size={22} /> : "post" }
        </CustomButton>   
    );
};

export default SendButton;