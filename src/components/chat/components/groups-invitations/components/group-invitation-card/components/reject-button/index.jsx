import { CircularProgress, IconButton } from "@mui/material"

import { useMutation } from "@apollo/client"
import { useCallback, useState } from "react"

import CloseIcon from '@mui/icons-material/Close';

import { REJECT_GROUP_INVITATION } from "src/graphql/mutations"

const RejectButton = ({ groupID, ID }) => {
    const rejectGroupInvitationMutation = useMutation(REJECT_GROUP_INVITATION);
    const [ isLoading, setIsLoading ] = useState(false)

    const rejectHandler = useCallback(() => {
        const rejectInvitation = rejectGroupInvitationMutation[0];
        setIsLoading(true);

        rejectInvitation({
            variables: {
                groupID,
                ID
            },
            onCompleted() {
                setIsLoading(false);
            },
            onError(error) {
                console.error(error)
                setIsLoading(false);
            }
        })
    }, [ groupID, ID, rejectGroupInvitationMutation ]);

    return (
        isLoading ? <CircularProgress className="text-red-500" size={24} /> : 
        <IconButton 
            className="border border-solid border-red-500 p-[.2rem] hover:bg-red-500"
            onClick={rejectHandler}>
            <CloseIcon className="text-red-500 text-[1.4rem] hover:text-white" />
        </IconButton>
    );
};

export default RejectButton;