import { useCallback, useMemo, useRef, useState } from "react"
import { Hidden, IconButton } from "@mui/material"
import classNames from "classnames"
import classes from "./styles.module.css"

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchInput = () => {
    const [ open, setOpen ] = useState(false);
    const closeHandler = useRef(null);
    const openHandler = useRef(null);

    const toggleState = useCallback((event) => {
        setOpen(b => {
            const state = !b;
            if(state) openHandler.current?.(event); else closeHandler.current?.();
            return state;
        })
    }, []);

    const inputMemo = useMemo(() => (
        <Hidden mdDown>
            <div 
                className={classNames(classes.transition,
                "bg-slate-300 flex items-center justify-end grow px-3 rounded-full dark:bg-stone-400")}>
                <input 
                    className={classNames(classes.transition, "bg-transparent border-0 outline-none grow w-auto md:h-10")} 
                    placeholder="search..."
                />
                <SearchIcon />
            </div>
        </Hidden>
    ), []);

    return (
        <>
            { inputMemo }
            <Hidden mdUp>
                <div 
                    className={classNames(classes.transition,
                    "bg-slate-300 flex mr-2 md:mr-0 rounded-full dark:bg-stone-400")}>
                    <IconButton
                        onClick={toggleState}>
                        { open ? <CloseIcon className="text-red-500" /> : <SearchIcon /> }
                    </IconButton>
                    <div 
                        className={classNames(classes.paper, "absolute rounded-xl", { [classes.paperShow]: open })}>
                        <div 
                            className={classNames(classes.transition,
                            "bg-slate-300 flex items-center justify-end  rounded-full dark:bg-stone-400", { "grow pl-3 pr-1": open })}>
                            <input 
                                className={classNames(classes.transition, classes.input, "bg-transparent border-0 outline-none h-0 w-0", { "h-6 grow w-auto": open }, { "p-0": !open })} 
                                placeholder="search..."
                            /> 
                            <IconButton
                                onClick={toggleState}>
                                { open ? <CloseIcon className="text-red-500" /> : <SearchIcon /> }
                            </IconButton>
                        </div>
                    </div>
                </div>
            </Hidden>
        </>
    );
};

export default SearchInput;