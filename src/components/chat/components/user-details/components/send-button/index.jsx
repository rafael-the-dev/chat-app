import { Button } from "@mui/material"
import { useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';

const SendButton = ({ value }) => {
    const [ isLoading, setIsLoading ] = useState(false);

    return (
        <Button
            className="mt-3"
            disabled={!Boolean(value.trim())}
            variant="contained">
            { isLoading ? <CircularProgress className="text-slate-100" size={25} /> : "Send" }
        </Button>
    );
};

export default SendButton;