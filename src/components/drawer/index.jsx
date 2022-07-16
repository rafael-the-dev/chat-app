import { useCallback, useEffect, useState} from "react"
import { Drawer } from "@mui/material"


const Container = ({ children, id, closeHandler, drawerPaper, drawerRoot, openHandler }) => {
    const [ open, setOpen ] = useState(false);

    const onOpen = useCallback(() => setOpen(true), []);
    const onClose = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if(closeHandler) closeHandler.current = onClose;
    }, [ onClose, closeHandler ])

    useEffect(() => {
        openHandler.current = onOpen;
    }, [ onOpen, openHandler ]);

    return (
        <Drawer
            anchor="right"
            id={id}
            open={open}
            onClose={onClose}
            classes={{ paper: drawerPaper, root: drawerRoot }}>
            { children }
        </Drawer>
    );
};

export default Container;