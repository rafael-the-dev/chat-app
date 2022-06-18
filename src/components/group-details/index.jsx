import { Avatar, Drawer, IconButton, Typography } from "@mui/material"
import { useContext, useMemo } from "react"
import classNames from "classnames"
import classes from "./styles.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppContext } from "src/context";

import Card from "./components/card"

const GroupDetails = ({ close, group, openDrawer }) => {
    const { serverPublicURL } = useContext(AppContext)

    const details = useMemo(() => {
        if(Boolean(openDrawer) && Boolean(group)) return group;

        return { admin: "", image: "", name: "", members: [] };
    }, [ openDrawer, group ]);

    return (
        <Drawer
            anchor="right"
            id="group-details-drawer"
            open={openDrawer}
            onClose={close}
            classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
            >
            <div className={classNames("flex flex-col h-full items-center")}>
                <div className="mb-8 pt-3 w-full">
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
                <ul className="mt-6 w-full">
                    {
                        details.members.map(member => (
                            <Card key={member} admin={details.admin} username={member} />
                        ))
                    }
                </ul>
            </div>
        </Drawer>
    );
};

export default GroupDetails;