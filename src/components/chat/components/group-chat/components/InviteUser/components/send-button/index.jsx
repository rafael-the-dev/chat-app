import { Button } from "@mui/material"
import { useCallback, useState } from "react"
import classNames from "classnames"

import CircularProgress from '@mui/material/CircularProgress';


const SendButton = () => {
    const [ isLoading, setIsLoading ] = useState(false);

    const sendHandler = useCallback(() => {}, [])

    return (
        <Button 
            variant="contained"
            type=""
            className={classNames("capitalize ml-4 px-6 hover:opacity-70")}
            onClick={sendHandler}>
            { isLoading ? <CircularProgress className="text-slate-100" size={25} /> : "Send" }
        </Button>
    );
};

export default SendButton;