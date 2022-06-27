import classNames from "classnames"
import { useCallback } from "react"
import { Button } from "@mui/material"
import { useState } from "react";
import Tabs from "src/components/settings-tabs"

const ProfileContainer = () => {
    return (
        <>
            <div className="h-ful sub-root">
                <Tabs />
            </div>
        </>
    );
};

export default ProfileContainer;