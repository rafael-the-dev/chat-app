import { CircularProgress, IconButton } from "@mui/material"

import { useMutation } from "@apollo/client"
import { useCallback, useState } from "react"

import CheckIcon from '@mui/icons-material/Check';

import { REJECT_GROUP_INVITATION } from "src/graphql/mutations"

const AcceptButton = ({ groupID, ID }) => {
    const rejectGroupInvitationMutation = useMutation(REJECT_GROUP_INVITATION);
    const [ isLoading, setIsLoading ] = useState(false)

    const acceptHandler = useCallback(() => {
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
                console.log(error)
                setIsLoading(false);
            }
        })
    }, [ groupID, ID, rejectGroupInvitationMutation ]);

    return (
        isLoading ? <CircularProgress className="ml-2 text-cyan-500" size={24} /> : 
        <IconButton 
            className="border border-solid border-cyan-500 bg-cyan-500 ml-2 p-[.2rem] 
            hover:bg-transparent"
            onClick={acceptHandler}>
            <CheckIcon className="text-white text-[1.4rem] hover:text-cyan-500" />
        </IconButton>
    );
};

export default AcceptButton;