import { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import classNames from 'classnames';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
//import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from "src/context/AppContext";

import FriendCard from "../user-card";

const Container = ({ className }) => {
    const { getUsersList } = useContext(AppContext)
    const [ filter, setFilter ] = useState("");
    const inputRef = useRef(null);

    const filterList = useMemo(() => {
        if(filter === "") return getUsersList();

        const filterLowerCased = filter.toLocaleLowerCase();
        return getUsersList().filter(item => item.username.toLocaleLowerCase().includes(filterLowerCased) || item.name.toLowerCase().includes(filterLowerCased))
    }, [ filter, getUsersList ])

    const searchHandler = useCallback(event => {
        event.preventDefault();
        const value = inputRef.current.value.trim();
        if(inputRef.current !== null && value !== "") setFilter(value)
    }, []);

    const onChangeHandler = useCallback(event => {
        if(event.target.value === "") {
            setFilter("")
        }
    }, [])

    return (
        <div className={classNames(className)}>
            <form 
                className={classNames("border border-solid border-slate-200 flex items-center px-2 py-1")}
                onSubmit={searchHandler}>
                <IconButton type="button">
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
            <div className="px-5 pt-6">
                {
                    filterList?.map((item, index) => <FriendCard key={index} { ...item } />)
                }
            </div>
        </div>
    );
};

export default Container;