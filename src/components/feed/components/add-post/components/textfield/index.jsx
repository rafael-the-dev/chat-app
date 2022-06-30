import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles";
import { forwardRef, useCallback, useMemo, useRef, useState, useTransition } from "react"
import classNames from "classnames"

const CustomTextfield = styled(TextField)({
    ".dark & .MuiOutlinedInput-input": {
        color: "#94a3b8"
    }
})

const TextfieldContainer = forwardRef(({ file, setInputValue }, ref) => {
    const [ properties, setProperties ] = useState({ hasError: false, value: "" });
    const [ _, startTransition ] = useTransition();
    const maxCharacteresLength = useRef(20);

    const { hasError, value } = properties;

    const inputChangeHandler = useCallback(event => {
        const inputValue = event.target.value.trim();
        startTransition(() => {
            setProperties(currentProperties => {
                if(currentProperties.value.length === 0) {
                    //return inputValue;
                } else if(currentProperties.value.length > 0 && inputValue.length === 0) {
                    //return inputValue;
                }

                if(inputValue.length > maxCharacteresLength.current) {
                    return { ...currentProperties, hasError: true };
                }

                return { hasError: false, value: inputValue };
            })
        })
    }, []);

    const leftCharacteres = useMemo(() => maxCharacteresLength.current - value.length, [ value ])

    return (
        <>
            <CustomTextfield 
                className={classNames({ "mt-3": Boolean(file.image) }, `dark:border-cyan-800 
                dark:bg-stone-900 dark:text-slate-300`)}
                error={hasError}
                fullWidth
                multiline
                onChange={inputChangeHandler}
                placeholder={Boolean(file.image) ? "Add image's caption" : "what do you want to talk about?" }
                rows={Boolean(file.image) ? 2 : 5}
                value={value}
            />
            <div className="flex justify-end mt-2">
                <label className={classNames(hasError ? "text-red-600" : "dark:text-slate-500")}>
                    { leftCharacteres } / { maxCharacteresLength.current }
                </label>
            </div>
        </>
    );
});

export default TextfieldContainer;