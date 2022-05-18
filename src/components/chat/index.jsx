import { useCallback, useState } from 'react'
import { Button } from '@mui/material'
import classNames from "classnames"

const Container = () => {
    const [ chatTab, setChatTab ] = useState("DIRECT_CHAT");

    const clickHandler = useCallback(prop => () => setChatTab(prop), []);

    const classesToggler = useCallback((key, tab) => {
        return tab === key ? "bg-gray-500" : "bg-gray-400 text-black"
    }, [ ])

    return (
        <main>
            <div className={classNames("flex pla")}>
                <Button 
                    className={classNames("rounded-none w-1/2", classesToggler("DIRECT_CHAT", chatTab))}
                    onClick={clickHandler("DIRECT_CHAT")}>
                    Direct chat
                </Button>
                <Button 
                    className={classNames("rounded-none w-1/2", classesToggler("GROUP_CHAT", chatTab))}
                    onClick={clickHandler("GROUP_CHAT")}>
                    Group chat
                </Button>
            </div>
            {

            }
        </main>
    );
};

export default Container;