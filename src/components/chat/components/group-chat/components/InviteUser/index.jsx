import { IconButton } from "@mui/material"
import { useRef } from 'react'

import GroupAddIcon from '@mui/icons-material/GroupAdd';

import Dialog from "./components/dialog"

const InviteUser = ({ group }) => {
    const openHandler = useRef(null);

    return (
        <>
            <IconButton onClick={() => openHandler.current?.()}>
                <GroupAddIcon className="text-slate-100" />
            </IconButton>
            <Dialog group={group} openHandler={openHandler} />
        </>
    );
};

export default InviteUser;