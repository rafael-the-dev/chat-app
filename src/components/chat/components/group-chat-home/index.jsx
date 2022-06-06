import { useCallback, useContext, useMemo } from 'react'
import classNames from "classnames"
import { IconButton } from "@mui/material"
import Link from 'next/link'

import AddIcon from '@mui/icons-material/Add';

import { AppContext, ChatContext } from "src/context"

import CreateGroupDialog from "../create-group-modal"
import MessageCard from "./components/message-card"

const GroupChat = () => {
    const { chatTab, groups, setOpenCreateGroupDialog } = useContext(ChatContext);
    const { getGroupsInvitations } = useContext(AppContext)
    
    const createGroupDialog = useMemo(() => <CreateGroupDialog />, []);

    const openCreateGroupDialog = useCallback(() => setOpenCreateGroupDialog(true), [ setOpenCreateGroupDialog ]);

    return (
        <div className={classNames({ "hidden": chatTab !== "GROUP_CHAT"})}>
            { getGroupsInvitations().length > 0 && <div className="flex justify-end px-4 pt-2">
                <Link href="/?tab=chat&amp;page=groups-invitations">
                    <a className="text-red-500 underline hover:text-red-400">
                        { getGroupsInvitations().length } group invitation{ getGroupsInvitations().length > 1 ? "s" : "" }
                    </a>
                </Link>
            </div> }
            <ul className={classNames("list-none pt-4")}>
                {
                    groups.map((item, index) => <MessageCard key={index} { ...item } />)
                }
            </ul>
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