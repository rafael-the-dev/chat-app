import { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material'
import classNames from 'classnames';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
//import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from "src/context/AppContext";
import { FriendshipContext } from 'src/context/FriendshipContext';

//import FriendCard from "../user-card";
import SearchList from "../search-list"
import FriendshipInvitations from "../friendship-invitations"

const Container = ({ className }) => {
    const { getUsersList } = useContext(AppContext)
    const { tab } = useContext(FriendshipContext)
    //const [ searchKey, setSearchKey ] = useState("");
    
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

/**
 * 

            

            

            
                
 */