import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { styled } from "@mui/material/styles";
import classNames from "classnames";

const CustomButton = styled(Button)({
    ".dark &.Mui-disabled": {
        backgroundColor: "#78716c"
    }
})

const SendButton = ({ file, setButtonValue }) => {
    const [ value, setValue ] = useState("");

    useEffect(() => {
        setButtonValue.current = setValue;
    }, [ setButtonValue ])

    return (
        <CustomButton 
            disabled={!Boolean(file.image) && !Boolean(value.trim())}
            variant="contained"
            type="button"
            className={classNames("border capitalize ml-3 px-8 hover:bg-transparent hover:border-solid hover:text-blue-500 hover:border-blue-500")}
            onClick={() => {}}>
            post
        </CustomButton>   
    );
};

export default SendButton;