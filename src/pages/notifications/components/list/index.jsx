import { useCallback, useContext, useEffect, useRef, useState, useTransition } from "react"
import { Button } from "@mui/material"
import classes from "./styles.module.css"
import classNames from "classnames"

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { AppContext } from "src/context"

import Card from "../post-card"

const Container = () => {
    const { getNotifications } = useContext(AppContext);

    const [ notifications, setNotifications ] = useState([]);
    const [ buttonProperties, setButtonProperties ] = useState({ hasNewNotifications: false, loading: false });
    const [ isPending, startTransition ] = useTransition();
    const { hasNewNotifications, loading } = buttonProperties;

    const notificationsContainerRef = useRef(null);
    const isFirstRender = useRef(true);

    const scrollToTop = useCallback(() => {
        notificationsContainerRef.current?.scrollTo({ behavior: "smooth", top: 0 });
    }, []);

    const clickHandler = useCallback(() => {
        setButtonProperties(currentProperties => ({ ...currentProperties, loading: true }));
        setTimeout(() => {
            setNotifications(getNotifications());
            startTransition(() => {
                scrollToTop();
                setButtonProperties({ hasNewNotifications: false, loading: false });
            });
        }, 1500)
    }, [ getNotifications, scrollToTop ]);

    useEffect(() => {
        setNotifications(currentPosts => {
            if(currentPosts.length === 0 && isFirstRender.current) {
                isFirstRender.current = false;
                return getNotifications();
            }

            startTransition(() => setButtonProperties({ hasNewNotifications: true, loading: false }));

            return currentPosts;
        })
    }, [ getNotifications ])

    return (
        <div className="relative">
            <Button 
                className={classNames(classes.button, { "opacity-0": !hasNewNotifications },
                "absolute normal-case rounded-xl top-0 z-10")}
                disabled={!hasNewNotifications}
                onClick={clickHandler}
                startIcon={!loading && <ArrowUpwardIcon />}
                variant="contained">
                { loading ? "Loading..." : "New Notifcations" }
            </Button>
            <ul 
                className={classNames(classes.list, "pt-6 px-4 mb-6 md:px-1 md:pt-1 md:mb-0")}
                ref={notificationsContainerRef}>
                {
                    notifications.map((item, index) => <Card key={index} { ...item} />)
                }
            </ul>
        </div>
    );
};

export default Container;