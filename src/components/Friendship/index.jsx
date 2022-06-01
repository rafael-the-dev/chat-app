import { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { Avatar, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material'
import Head from 'next/head';
import classNames from "classnames"
import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from "src/context/AppContext";
import { FriendshipContext } from "src/context/FriendshipContext";

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';

import SearchFriendsContainer from "./components/search-friends"
import FriendshipContainer from "./components/friendships"

const Container = () => {
    const { loggedUser } = useContext(LoginContext)
    const { filterOptions, searchFriendsFilter, setSearchFriendsFilter, setSearchKey, setTab, tab  } = useContext(FriendshipContext)
    const { getInitialsNameLetters, serverPublicURL } = useContext(AppContext)
    //const [ tab, setTab ] = useState("SEARCH_FRIENDS");
    //const [ filter, setFilter ] = useState("SEARCH");
    const [ anchorEl, setAnchorEl] = useState(null);
    const inputRef = useRef(null);

    const clickHandler = useCallback(prop => () => setTab(prop), []);

    const friendsContainer = useMemo(() => <FriendshipContainer />, []);
    const searchFriendsContainer = useMemo(() => <SearchFriendsContainer />, []);

    const classesToggler = useCallback((key, tab) => {
        return `py-2 rounded-none w-1/2 ${tab === key ? "bg-gray-500" : "bg-gray-400 text-black"}`
    }, [ ]);

    const searchHandler = useCallback(event => {
        event.preventDefault();

        const value = inputRef.current.value.trim();
        if(inputRef.current !== null && value !== "") setSearchKey(value)
    }, [ setSearchKey ]);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;

    const listItemClickHandler = useCallback(prop => () => {
        setSearchFriendsFilter(prop);
        handleClose();
    }, [ handleClose, setSearchFriendsFilter ]);


    const onChangeHandler = useCallback(event => {
        if(event.target.value === "") {
            setSearchKey("")
        }
    }, [ setSearchKey ]);
    
    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    return (
        <>
            <Head>
                <title>Friends</title>
            </Head>
            <header className="bg-cyan-700 flex items-center justify-between px-5 py-2">
                <Typography
                    className="font-bold text-slate-100 text-2xl uppercase" 
                    component="h1">
                    Chat app
                </Typography>
                <Avatar 
                    className={classNames({ "bg-cyan-500": !Boolean(loggedUser.image) })}
                    src={loggedUser.image ? `${serverPublicURL.current}/${loggedUser.image}` : ""}>
                    { loggedUser.image ? "" : getInitialsNameLetters(loggedUser ? loggedUser.name : "" ) }
                </Avatar>
            </header>
            <main>
                <div className={classNames("flex pla")}>
                    <Button 
                        className={classNames(classesToggler("SEARCH_FRIENDS", tab))}
                        onClick={clickHandler("SEARCH_FRIENDS")}>
                        Search friends
                    </Button>
                    <Button 
                        className={classNames(classesToggler("FRIENDS", tab))}
                        onClick={clickHandler("FRIENDS")}>
                        Friends
                    </Button>
                </div>
                <form 
                    className={classNames("border border-solid border-slate-200 flex items-center px-2 py-1")}
                    onSubmit={searchHandler}>
                    <IconButton className={classNames({ 'hidden': tab !== "SEARCH_FRIENDS" })} onClick={handleClick} type="button">
                        <FilterAltIcon />
                    </IconButton>
                    <input 
                        className={classNames("border-0 grow text-base outline-none py-3", { 'pl-4': tab !== "SEARCH_FRIENDS" })}
                        placeholder="search username"
                        ref={inputRef}
                        onChange={onChangeHandler}
                    />
                    <IconButton type="submit">
                        <SearchIcon />
                    </IconButton>
                </form>
                { searchFriendsContainer }
                { friendsContainer }
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
                                    primary="Search Friends" 
                                />
                                { searchFriendsFilter === filterOptions.current.search && (
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
                                    primary="Friendship Invitations" 
                                />
                                { searchFriendsFilter === filterOptions.current.invitations && (
                                    <ListItemIcon classes={{ root: "min-w-[20px] text-red-500" }}>
                                        <CheckIcon />
                                    </ListItemIcon>
                                )}
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Popover>
            </main>
        </>
    );
};

export default Container;