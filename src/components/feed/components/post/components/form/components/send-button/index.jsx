import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

const CustomButton = styled(Button)({
    "&.Mui-disabled": {
        color: "#94a3b8"
    }
})


const SendButton = ({ ID, inputRef, buttonSetValue }) => {
    const [ loading, setLoading ] = useState(false);
    const [ value, setValue ] = useState("");

    useEffect(() => {
        buttonSetValue.current = setValue;
    }, [ buttonSetValue ])

    return (
        <CustomButton
            disabled={loading || !Boolean(value)}>
            { loading ? "Posting..." : "Post"}
        </CustomButton>
    );
};

export default SendButton;