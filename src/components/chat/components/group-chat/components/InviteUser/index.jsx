import { IconButton } from "@mui/material"
import { useCallback, useState } from 'react'

import GroupAddIcon from '@mui/icons-material/GroupAdd';

import Dialog from "./components/dialog"

const InviteUser = ({ group }) => {
    const [ open, setOpen ] = useState(false);

    const toggleDialog = useCallback(prop => () => setOpen(prop), [ setOpen ]);

    return (
        <>
            <IconButton onClick={toggleDialog(true)}>
                <GroupAddIcon className="text-slate-100" />
            </IconButton>
            { open && <Dialog group={group} open={open} toggleDialog={toggleDialog} /> }
        </>
    );
};

export default InviteUser;