import { TextField } from "@mui/material"
import { useCallback, useMemo, useState } from "react"

import classes from "./styles.module.css"

import Button from "../send-button"

const Form = ({ username }) => {
    const [ value, setValue ] = useState("");

    const changeHandler = useCallback(event => setValue(event.target.value), [])

    const textField = useMemo(() => (
        <TextField 
            className="py-0"
            classes={{ root: classes.textfieldRoot }}
            fullWidth
            onChange={changeHandler}
            placeholder="Send a quick message here"
        />
    ), [ changeHandler ])

    return (
        <form className="mt-3">
            { textField }
            <Button username={username} value={value} />
        </form>
    );
};

export default Form;