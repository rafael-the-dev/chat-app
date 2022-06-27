import classNames from "classnames"
import { useCallback } from "react"
import { Button } from "@mui/material"
import { useRouter } from "next/router"

const SettingsContainer = () => {
    const router = useRouter();
    const { pathname } = router;

    const classesToggler = useCallback((key, tab) => {
        return `py-2 rounded-none w-1/2 ${tab === key ? "bg-gray-500" : "bg-gray-400 text-black"}`
    }, [ ]);

    const clickHandler = useCallback(prop => () => router.push(prop), [ router ])

    return (
        <div>
            <div className={classNames("flex pla")}>
                <Button 
                    className={classNames(classesToggler("/profile", pathname))}
                    onClick={clickHandler("/profile")}>
                    Profile
                </Button>
                <Button 
                    className={classNames(classesToggler("/settings", pathname))}
                    onClick={clickHandler("/settings")}>
                    Settings
                </Button>
            </div>
        </div>
    );
};

export default SettingsContainer;