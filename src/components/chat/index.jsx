import { useRouter } from "next/router"
import { useMemo } from 'react'
import { Hidden } from "@mui/material"

import ForwardMessageDialog from "src/components/forward-message";
import DirectChat from "./components/DirectChat";
import GroupChat from "./components/group-chat";
import Home from "./components/Home";
import GroupsInvitations from "./components/groups-invitations";

const Container = () => {
    const router = useRouter();
    const { page } = router.query;


    const directChat = useMemo(() => <DirectChat />, []);
    const groupChat = useMemo(() => <GroupChat />, [])
    const home = useMemo(() => <Home />, []);
    const forwardMessageDialog = useMemo(() => <ForwardMessageDialog />, [])
    const groupsInvitationsMemo = useMemo(() => <GroupsInvitations />, [])
    
    const selectedPage = useMemo(() => {
        switch(page) {
            case "direct-chat": {
                return directChat;
            }
            case "group-chat": {
                return groupChat;
            }
            case "groups-invitations": {
                return groupsInvitationsMemo;
            }
            default: {
                return (
                    <Hidden mdUp>
                        { home }
                    </Hidden>
                );
            }
        }
    }, [ directChat, groupChat, groupsInvitationsMemo, home, page ])

    return (
        <>
            <Hidden mdDown>
                <Home />
            </Hidden>
            { selectedPage }
            { forwardMessageDialog }
        </>
    );
};

export default Container;

/**
 * <Hidden mdUp>
                { selectedPage }
            </Hidden>
 */