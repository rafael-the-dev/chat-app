import { Avatar, Drawer, IconButton, Typography } from "@mui/material"
import { useContext, useMemo } from "react"
import classNames from "classnames"
import classes from "./styles.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppContext } from "src/context";

const GroupDetails = ({ close, group, openDrawer }) => {
    const { serverPublicURL } = useContext(AppContext)

    const details = useMemo(() => {
        if(Boolean(openDrawer) && Boolean(group)) return group;

        return { admin: "", image: "", name: "", members: [] };
    }, [ openDrawer, group ]);

    /*const close = () => {
        /*console.log("onClose")
        const { pathname } = router;
        let query = `${pathname}?tab=${router.query.tab}`;
        Object.entries(router.query).forEach(tuple => {
            const key = tuple[0];
            const value = tuple[1];

            if(key !== "tab" && key !== "gd") {
                query += `&${key}=${value}`;
            }
        });

        groupDetails.current = null;
        //openDrawer(false);
    };//, [ router ])*/

    return (
        <Drawer
            anchor="right"
            id="group-details-drawer"
            open={openDrawer}
            onClose={close}
            classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
            >
            <div className={classNames("flex flex-col h-full items-center px-5")}>
                <div className="-ml-4 mb-8 pt-3 w-full">
                    <IconButton onClick={close}>
                        <ArrowBackIcon />
                    </IconButton>
                </div>
                <Avatar 
                    alt={details.name}
                    className=""
                    imgProps={{ loading: "lazy" }}
                    src={details.image ? `${serverPublicURL.current}/${details.image}` : ""}
                />
                <Typography 
                    className="font-bold text-xl"
                    component="h2">
                    { details.name }
                </Typography>
                <Typography 
                    className="max-w-[80%]"
                    component="p">
                    { details.description }
                </Typography>
                <ul>
                    {

                    }
                </ul>
            </div>
        </Drawer>
    );
};

export default GroupDetails;