import { TextField } from "@mui/material"
import { useCallback, useMemo, useRef, useState } from "react"
import { styled } from '@mui/material/styles';

import classes from "./styles.module.css"

import Button from "../send-button"

const CustomTextfield = styled(TextField)({
    '.dark & label': {
        color: '#cbd5e1',
    },
    '.dark & .MuiOutlinedInput-root': {
        color: '#cbd5e1',
        '& fieldset': {
            borderColor: '#1e40af',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0d9488',
        },
    },
})

const Form = ({ username }) => {
    const [ value, setValue ] = useState("");
    const inputRef = useRef(null);
    const handler = useRef(null);

    const changeHandler = useCallback(event => {
        const inputValue = event.target.value;
        setValue(inputValue);
    }, [])

    const textField = useMemo(() => (
        <CustomTextfield 
            className="py-0 dark:text-slate-300"
            classes={{ root: classes.textfieldRoot }}
            fullWidth
            inputRef={inputRef}
            onChange={changeHandler}
            placeholder="Send a quick message here"
            required
        />
    ), [ changeHandler ]);

    const submitHandler = useCallback(event => {
        event.preventDefault();

        if(handler.current) {
            handler.current();
        }

    }, [])

    return (
        <form className="mt-3" onSubmit={submitHandler}>
            { textField }
            <Button handler={handler} setValue={setValue} username={username} inputRef={inputRef} value={value} />
        </form>
    );
};

export default Form;