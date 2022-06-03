import { useCallback, useContext, useMemo } from 'react'
import classNames from "classnames"
import { IconButton } from "@mui/material"

import AddIcon from '@mui/icons-material/Add';

import { ChatContext } from "src/context"

import CreateGroupDialog from "../create-group-modal"

const GroupChat = () => {
    const { chatTab, setOpenCreateGroupDialog } = useContext(ChatContext);

    const createGroupDialog = useMemo(() => <CreateGroupDialog />, []);

    const openCreateGroupDialog = useCallback(() => setOpenCreateGroupDialog(true), [ setOpenCreateGroupDialog ]);

    return (
        <div className={classNames({ "hidden": chatTab !== "GROUP_CHAT"})}>
            { createGroupDialog }
            <IconButton className="bg-cyan-700 bottom-[5rem] fixed right-3 text-slate-100 z-10 
                hover:bg-red-500 hover:text-slate-300"
                onClick={openCreateGroupDialog}>
                <AddIcon className="text" />
            </IconButton>
        </div>
    );
};

export default GroupChat;