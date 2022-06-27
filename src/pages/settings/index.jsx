import classNames from "classnames"
import { useCallback, useContext } from "react"
import { Button, IconButton, Typography } from "@mui/material"
import { useState } from "react";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import Tabs from "src/components/settings-tabs"

import { ThemeContext } from "src/context/ThemeContext"

const SettingsContainer = () => {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <div className="bg-transition h-ful sub-root dark:bg-stone-500">
                <Tabs />
                <div  className="flex items-center justify-between mt-6 px-4">
                    <Typography 
                        className="font-semibold text-transition dark:text-slate-200"
                        component="h2">
                        { isDarkTheme ? "Dark" : "Light" } theme
                    </Typography>
                    <div className="flex items-center">
                        <IconButton className="p-1" onClick={toggleTheme}>
                            <LightModeIcon className={classNames("text-transition dark:text-slate-500", { "text-black": !isDarkTheme })}  />
                        </IconButton>
                        <div 
                            className={classNames("bg-white rounded-lg flex mx-2 px-2 py-1 w-12", 
                            { "justify-end": isDarkTheme })}
                            onClick={toggleTheme}>
                            <span  className={classNames("bg-cyan-500 h-4 rounded-full w-4")}></span>
                        </div>
                        <IconButton className="p-1" onClick={toggleTheme}>
                            <DarkModeIcon className={classNames({ "text-transition dark:text-slate-200": isDarkTheme })} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsContainer;