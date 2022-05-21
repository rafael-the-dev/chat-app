import { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material'
import classNames from 'classnames';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
//import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from "src/context/AppContext";

//import FriendCard from "../user-card";
import SearchList from "../search-list"
import FriendshipInvitations from "../friendship-invitations"

const Container = ({ className }) => {
    const { getUsersList } = useContext(AppContext)
    const [ searchKey, setSearchKey ] = useState("");
    const [ filter, setFilter ] = useState("SEARCH");
    const [ anchorEl, setAnchorEl] = useState(null);
    const inputRef = useRef(null);

    const friendshipInvitationsMemo = useMemo(() => <FriendshipInvitations />, []);
    const searchListMemo = useMemo(() => (
        <SearchList 
            searchKey={searchKey} 
        />
    ), [ searchKey ]);

    const filterOptions = useRef({
        invitations: "INVITATIONS",
        search: "SEARCH",
    })

    const searchHandler = useCallback(event => {
        event.preventDefault();

        const value = inputRef.current.value.trim();
        if(inputRef.current !== null && value !== "") setSearchKey(value)
    }, []);

    const onChangeHandler = useCallback(event => {
        if(event.target.value === "") {
            setSearchKey("")
        }
    }, []);
    
    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;

    const listItemClickHandler = useCallback(prop => () => {
        setFilter(prop);
        handleClose();
    }, [ handleClose ]);

    return (
        <div className={classNames(className)}>
            <form 
                className={classNames("border border-solid border-slate-200 flex items-center px-2 py-1")}
                onSubmit={searchHandler}>
                <IconButton onClick={handleClick} type="button">
                    <FilterAltIcon />
                </IconButton>
                <input 
                    className={classNames("border-0 grow text-base outline-none py-3")}
                    placeholder="search username"
                    ref={inputRef}
                    onChange={onChangeHandler}
                />
                <IconButton type="submit">
                    <SearchIcon />
                </IconButton>
            </form>
            <div className={classNames({ "hidden": filter !== filterOptions.current.search }, "px-5 pt-6")}>
                { searchListMemo }
            </div>
            <div className={classNames("px-5 mt-6", { 'hidden': filter !== filterOptions.current.invitations })}>
                { friendshipInvitationsMemo }
            </div>
            <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClose}
                classes={{ paper: ""}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List className={classNames("pt-0 w-[230px]")}>
                    <ListItem 
                        disablePadding 
                        onClick={listItemClickHandler(filterOptions.current.search)} 
                        className={classNames()}>
                        <ListItemButton>
                            <ListItemText 
                                classes={{}} 
                                primary="Search Friends" 
                            />
                            { filter === filterOptions.current.search && (
                                <ListItemIcon classes={{ root: "min-w-[20px] text-red-500" }}>
                                    <CheckIcon />
                                </ListItemIcon>
                            )}
                        </ListItemButton>
                    </ListItem>
                    <ListItem 
                        disablePadding 
                        onClick={listItemClickHandler(filterOptions.current.invitations)} 
                        className={classNames()}>
                        <ListItemButton>
                            <ListItemText 
                                classes={{}} 
                                primary="Friendship Invitations" 
                            />
                            { filter === filterOptions.current.invitations && (
                                <ListItemIcon classes={{ root: "min-w-[20px] text-red-500" }}>
                                    <CheckIcon />
                                </ListItemIcon>
                            )}
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
};

export default Container;

/**
 * 

            

            

            
                
 */