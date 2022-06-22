import { useCallback, useState } from "react"
import { IconButton } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from "@apollo/client";
import { ACCEPT_FRIENDSHIP_INVITATION, REJECT_FRIENDSHIP_INVITATION } from "src/graphql/mutations";
import { GET_LOGGED_USER_DETAILS } from "src/graphql/queries";

const AcceptButton = ({ ID }) => {
    const acceptFriendshipMutation = useMutation(ACCEPT_FRIENDSHIP_INVITATION, { 
        refetchQueries: [ GET_LOGGED_USER_DETAILS ]
    });

    const rejectMutation = useMutation(REJECT_FRIENDSHIP_INVITATION, { 
        refetchQueries: [ GET_LOGGED_USER_DETAILS ]
    });

    const [ loading, setLoading ] = useState({ acceptButton: false, rejectButton: false });

    const acceptFriendshipInvitation = useCallback(() => {
        const acceptInvitation = acceptFriendshipMutation[0];
        setLoading({ acceptButton: true, rejectButton: false });

        acceptInvitation({ 
            variables: {
                id: ID
            },
            onError(err) {
                console.log(err);
                setLoading({ acceptButton: false, rejectButton: false })
            }
        });
    }, [ ID, acceptFriendshipMutation ]);

    const rejectFriendshipInvitation = useCallback(() => {
        const rejectInvitation = rejectMutation[0];
        setLoading({ acceptButton: false, rejectButton: true })

        rejectInvitation({ 
            variables: {
                id: ID
            },
            onError(err) {
                console.log(err);
                setLoading({ acceptButton: false, rejectButton: false });
            }
        });
    }, [ ID, rejectMutation ]);

    return (
        <div className="flex items-center">
            <IconButton 
                aria-label="reject friendship invitation"
                className="p-[5px]"
                disabled={loading.acceptButton}
                onClick={rejectFriendshipInvitation}>
                { loading.rejectButton ?
                    <CircularProgress className="text-red-500" size={22} /> :
                    <CloseIcon className="opacity-80 text-red-500" />
                }
            </IconButton>
            <IconButton 
                aria-label="accept friendship invitation"
                className="ml-2 p-[5px]"
                disabled={loading.rejectButton}
                onClick={acceptFriendshipInvitation}>
                { loading.acceptButton ?
                    <CircularProgress className="text-blue-600" size={22} /> :
                    <CheckIcon className="opacity-80 text-blue-600" />
                }
            </IconButton>
        </div>
    );
};

export default AcceptButton;