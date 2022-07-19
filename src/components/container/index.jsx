import classNames from "classnames"
import { useRouter } from "next/router"
import classes from "./styles.module.css"

const Container = ({ children }) => {
    const router = useRouter();
    const { query, pathname } = router;
    const { page } = query;

    const isChatPage = () => {
        if(page) {
            return ([ 'direct-chat', 'group-chat' ].includes(page) && pathname === '/chat');
        }

        return false;
    };

    const isGroupInvitationsPage = () => {
        if(page) {
            return page === "groups-invitations" && pathname === '/chat';
        }

        return false;
    };
    
    return (
        <div 
            className={classNames('h-ful sub-root', 
            pathname === "/notifications" ? "dark:bg-stone-900" : "dark:bg-stone-500",
            { 'sub-root--chat': isChatPage() }, 
            { [classes.subRootProfile]: pathname === '/profile'},
            { [classes.subRootGroupsInvitations]: isGroupInvitationsPage()})}>
            { children }
        </div>
    );
};

export default Container;