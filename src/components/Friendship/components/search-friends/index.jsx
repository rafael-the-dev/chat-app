import { useContext, useMemo} from 'react'
import classNames from 'classnames';

import { FriendshipContext } from 'src/context/FriendshipContext';

import SearchList from "../search-list"
import FriendshipInvitations from "../friendship-invitations"

const Container = ({ className }) => {
    const { tab } = useContext(FriendshipContext)
    
    const friendshipInvitationsMemo = useMemo(() => <FriendshipInvitations />, []);
    const searchListMemo = useMemo(() => <SearchList />, []);
    
    return (
        <div className={classNames({ 'hidden': tab !== 'SEARCH_FRIENDS' })}>
            { searchListMemo }
            { friendshipInvitationsMemo }
        </div>
    );
};

export default Container;
