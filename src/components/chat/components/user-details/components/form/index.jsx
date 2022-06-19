import { Button, TextField } from "@mui/material"
import { useCallback, useMemo, useState } from "react"

import classes from "./styles.module.css"

const Form = () => {
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
            <Button
                className="mt-3"
                disabled={!Boolean(value.trim())}
                variant="contained">
                Send
            </Button>
        </form>
    );
};

export default Form;