import { Alert } from "@mui/material"
import { useRef } from 'react'

import { closeAlert } from "src/helpers/alert"

const FeedbackAlert = ({ hasError, target }) => {
    const successAlert = useRef(null);
    const errorAlert = useRef(null);

    return (
        <>
            { hasError ? (
                <Alert 
                    className="mb-3" 
                    color="error"
                    ref={errorAlert} 
                    severity="error" 
                    onClose={closeAlert(errorAlert)}>
                    Invitation to { target } not sent!
                </Alert>
            ) :
            (
                <Alert 
                    className="mb-3"
                    color="info" 
                    ref={successAlert} 
                    severity="success"  
                    onClose={closeAlert(successAlert)}>
                    { target } was successfully invited!
                </Alert>
            )}
        </>
    );
};

export default FeedbackAlert;