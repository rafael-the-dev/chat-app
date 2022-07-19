import { useCallback, useContext, useEffect, useRef, useState, useTransition } from "react"
import { Button } from "@mui/material"
import classes from "./styles.module.css"
import classNames from "classnames"
import { useMutation } from "@apollo/client"

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { CHECK_NOTIFICATIONS } from "src/graphql/mutations"
import { GET_LOGGED_USER_DETAILS } from "src/graphql/queries"
import { AppContext } from "src/context"

import Card from "../post-card"
import Empty from "src/components/empty"

const Container = () => {
    const checkNotificationsMutation = useMutation(CHECK_NOTIFICATIONS, { refetchQueries: [ GET_LOGGED_USER_DETAILS ] })
    const { getNotifications, hasNewNotifications } = useContext(AppContext);

    const [ notifications, setNotifications ] = useState([]);
    const [ buttonProperties, setButtonProperties ] = useState({ hasNewNotification: false, loading: false });
    const [ isPending, startTransition ] = useTransition();
    const { hasNewNotification, loading } = buttonProperties;

    const notificationsContainerRef = useRef(null);
    const isFirstRender = useRef(true);

    const scrollToTop = useCallback(() => {
        notificationsContainerRef.current?.scrollTo({ behavior: "smooth", top: 0 });
    }, []);

    const checkNotifcationsHandler = useCallback(() => {
        const check = checkNotificationsMutation[0];

        check({
            onError(error) {
                console.error(error)
            }
        })
    }, [checkNotificationsMutation ])

    const clickHandler = useCallback(() => {
        setButtonProperties(currentProperties => ({ ...currentProperties, loading: true }));
        setTimeout(() => {
            setNotifications(getNotifications());
            startTransition(() => {
                scrollToTop();
                hasNewNotifications.current = false;
                setButtonProperties({ hasNewNotification: false, loading: false });
                checkNotifcationsHandler();
            });
        }, 1500)
    }, [ checkNotifcationsHandler, getNotifications, hasNewNotifications, scrollToTop ]);

    useEffect(() => {
        setNotifications(currentPosts => {
            if(currentPosts.length === 0) {
                hasNewNotifications.current = false;
                checkNotifcationsHandler();
                return getNotifications();
            }

            if(hasNewNotifications.current) {
                startTransition(() => setButtonProperties({ hasNewNotification: true, loading: false }));
            } 

            return currentPosts;
        })

        return () => isFirstRender.current = true;
    }, [ checkNotifcationsHandler, hasNewNotifications, getNotifications ])

    return (
        <div className="relative">
            <Button 
                className={classNames(classes.button, { "opacity-0": !hasNewNotification },
                "absolute normal-case rounded-xl top-0 z-10")}
                disabled={!hasNewNotification}
                onClick={clickHandler}
                startIcon={!loading && <ArrowUpwardIcon />}
                variant="contained">
                { loading ? "Loading..." : "New Notifcations" }
            </Button>
            { notifications.length > 0 ? (
                <ul 
                    className={classNames(classes.list, "pt-6 px-4 mb-6 md:px-1 md:pt-1 md:mb-0")}
                    ref={notificationsContainerRef}>
                    {
                        notifications.map((item, index) => <Card key={item.ID} { ...item} />)
                    }
                </ul> ) :
                <Empty message="There are no notifcations yet" />
            }
        </div>
    );
};

export default Container;