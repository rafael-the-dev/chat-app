import classNames from "classnames"
import { useCallback } from "react"
import { Button, Typography } from "@mui/material"
import { useState } from "react";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import Tabs from "src/components/settings-tabs"

const SettingsContainer = () => {
    return (
        <>
            <div className="h-ful sub-root">
                <Tabs />
                <div  className="flex items-center justify-between mt-6 px-4">
                    <Typography 
                        className="font-semibold"
                        component="h2">
                        Light theme
                    </Typography>
                    <div className="flex items-center">
                        <LightModeIcon />
                        <div className={classNames("bg-white rounded-md flex mx-2 px-2 py-1 w-12")}>
                            <span  className={classNames("bg-cyan-500 h-4 rounded-full w-4")}></span>
                        </div>
                        <DarkModeIcon />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsContainer;