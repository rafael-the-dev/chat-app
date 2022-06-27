import classNames from "classnames"
import { useCallback } from "react"
import { Button } from "@mui/material"
import { useState } from "react";
import Tabs from "src/components/settings-tabs"

const SettingsContainer = () => {
    return (
        <main>
            <Tabs />
        </main>
    );
};

export default SettingsContainer;