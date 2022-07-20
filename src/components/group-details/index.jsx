import { IconButton, Typography } from "@mui/material"
import { useMemo } from "react"
import classNames from "classnames"
import classes from "./styles.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Card from "./components/card"
import Drawer from "src/components/drawer";
import Avatar from "src/components/avatar";

const GroupDetails = ({ closeHandler, group, openHandler }) => {
    const details = useMemo(() => {
        if(Boolean(group)) return group;

        return { admin: "", image: "", name: "", members: [] };
    }, [ group ]);

    return (
        <Drawer
            drawerPaper={classes.drawerPaper}
            drawerRoot={classes.drawerRoot}
            id="group-details-drawer"
            closeHandler={closeHandler}
            openHandler={openHandler}>
            <div className={classNames("flex flex-col h-full items-center")}>
                <div className="mb-8 pt-3 w-full">
                    <IconButton onClick={() => closeHandler.current?.()}>
                        <ArrowBackIcon />
                    </IconButton>
                </div>
                <Avatar 
                    alt={details.name}
                    image={details.image}
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