import { Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";

const InputContainer = ({ valueRef }) => {
    const [ value, setValue ] = useState("")

    const leftCharacters = useMemo(() => 200 - value.length, [ value ]);
    const onChangeHandler = useCallback(event => {
        const inputValue = event.target.value;
        if(inputValue.length < 200) {
            valueRef.current = inputValue;
            setValue(inputValue);
        }
    }, [ valueRef ])

    return (
        <form className="flex flex-col items-stretch mt-4 w-full">
            <Typography 
                className="dark:text-slate-300"
                component="label" 
                htmlFor="description-input">
                Message (Optional)
            </Typography>
            <textarea 
                className="border-cyan-500 mt-3 text-base outline-cyan-800 dark:bg-stone-900 dark:text-slate-300"
                id="description-input"
                placeholder="Insert your message"
                rows="6"
                onChange={onChangeHandler}
            ></textarea>
            <Typography 
                className="mt-2 self-end dark:text-slate-400"
                component="label" 
                htmlFor="description-input">
                { leftCharacters } / 200
            </Typography>
        </form>
    );
};

export default InputContainer;