import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import classNames from "classnames"
import { Dialog } from "@mui/material"


const Container = ({ ariaDescribedby, ariaLabelledby, children, closeHandler, customClose, dialogPaper, dialogRoot, openHandler }) => {
    const router = useRouter();
    const { pathname } = router;

    const currentPath = useRef(null);
    const [ open, setOpen ] = useState(false);

    const childrenMemo = useMemo(() => children, [ children ])
    const handleClose = useCallback(() => setOpen(false), []);

    useEffect(() => {
        openHandler.current = () => setOpen(true);
    }, [ openHandler ]);

    useEffect(() => {
        if(closeHandler) closeHandler.current = handleClose;
    }, [ closeHandler, handleClose ]);

    useEffect(() => {
        if(pathname !== currentPath.current) {
            setOpen(false);
            return;
        }
        currentPath.current = pathname;
    }, [ pathname ]);

    return (
        <Dialog
            classes={{ paper: classNames(dialogPaper), root: dialogRoot }}
            open={open}
            onClose={customClose ? customClose : handleClose}
            aria-describedby={ariaDescribedby}
            aria-labelledby={ariaLabelledby}
        >
            { childrenMemo }
        </Dialog>
    );
};

export default Container;