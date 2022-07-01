import { useCallback, useState } from "react"
import { IconButton } from "@mui/material"
import classNames from "classnames"
import { useRouter } from "next/router"
import classes from "./styles.module.css"

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchInput = () => {
    const [ open, setOpen ] = useState(false);

    const router = useRouter();
    const { pathname } = router;

    const toggleState = useCallback(() => setOpen(b => !b), [])//rounded-2xl
    
    return (
        <div 
            className={classNames(classes.transition, { "max-w-sm": pathname === "/"},
            "bg-slate-300 flex items-center justify-end rounded-full dark:bg-stone-400", { "grow pl-3 pr-1": open })}>
            <input 
                className={classNames(classes.transition, "bg-transparent border-0 outline-none h-0 w-0", { "h-6 grow w-auto": open }, { "p-0": !open })} 
                placeholder="search..."
            />
            <IconButton
                onClick={toggleState}>
                { open ? <CloseIcon className="text-red-500" /> : <SearchIcon /> }
            </IconButton>
        </div>
    );
};

export default SearchInput;