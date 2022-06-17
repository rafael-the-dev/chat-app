import { Avatar, Drawer, Typography } from "@mui/material"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import classNames from "classnames"
import classes from "./styles.module.css"
import { AppContext } from "src/context";

const GroupDetails = () => {
    const router = useRouter();
    const { gd } = router.query;

    const { groupDetails } = useContext(AppContext)
    const [ open, setOpen ] = useState(false);

    const details = useMemo(() => {
        if(Boolean(groupDetails.current) && Boolean(gd)) return groupDetails.current;

        return { admin: "", name: "", members: [] };
    }, [ gd, groupDetails ]);

    const close = useCallback(() => setOpen(false), [])

    useEffect(() => {
        if(Boolean(groupDetails.current) && Boolean(gd)) {
            setOpen(true);
        }
    }, [ gd, groupDetails ])

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={close}
            classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
            >
            <div className={classNames("flex flex-col h-full items-center px-5 py-8", classes.drawerContent)}>
                <Avatar 
                    alt={details.name}
                    className=""
                    imgProps={{ loading: "lazy" }}
                    src={`${details.image}`}
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