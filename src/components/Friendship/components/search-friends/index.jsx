import { useContext } from 'react'
import { IconButton } from '@mui/material'
import classNames from 'classnames';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
//import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from "src/context/AppContext";

import FriendCard from "../user-card";

const Container = ({ className }) => {
    const { getUsersList } = useContext(AppContext)

    return (
        <div className={classNames(className)}>
            <form className={classNames("border border-solid border-slate-200 flex items-center px-2 py-1")}>
                <IconButton>
                    <FilterAltIcon />
                </IconButton>
                <input 
                    className={classNames("border-0 grow text-base outline-none py-3")}
                    placeholder="search username"
                />
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </form>
            <div className="px-5 pt-6">
                {
                    getUsersList()?.map((item, index) => <FriendCard key={index} { ...item } />)
                }
            </div>
        </div>
    );
};

export default Container;