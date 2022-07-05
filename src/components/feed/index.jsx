import { Button, Hidden, Paper } from "@mui/material"
import classNames from "classnames"
import { useMemo } from "react"
import { useRouter } from "next/router"

import classes from "./styles.module.css"

import AdBanner from "./components/ad-banner"
import KnownPeople from "./components/known-people"
import Avatar from "../logged-user-avatar"
import Input from "./components/search-input"
import AddPost from "./components/add-post"
import Posts from "./components/posts-container"

const Feed = () => {
    const router = useRouter();
    const { pathname } = router;
    const { page, tab } = router.query;

    //![ '/login', '/signup' ].includes(pathname) && Boolean(user) && !Boolean(page) && 
    const canIHide = useMemo(() => {
        if([ '/login', '/signup' ].includes(pathname)) {
            return true;
        } 

        return Boolean(page);
    }, [ page, pathname ])

    return (
        <div className={classNames(classes.transition, `grow items-stretch pt-8 bg-transitionV h-screen 
            dark:bg-stone-900`, pathname === "/" ? [classes.rootHomePage] : "md:pr-8",
            canIHide ? "hidden" : `${pathname !== "/" ? "hidden md:flex" : "flex"}`)}>
            <div className={classNames(pathname === "/" ? "md:pl-0 md:pr-16" : "px-6", "grow")}>
                <div className="px-4 md:px-0">
                    <Paper className={classNames(classes.transition, classes.postsPanel, `bg-transition flex items-center 
                        justify-between px-3 py-2 rounded-xl shadow-none dark:bg-stone-500`)}>
                        <div className="flex">
                            <AddPost />
                            <Button className="border border-solid border-blue-600 ml-3 rounded-lg text-blue-600">
                                Filter
                            </Button>
                        </div>
                        <div className="flex grow justify-end ml-3">
                            <Input />
                            <Hidden mdUp>
                                <Avatar />
                            </Hidden>
                        </div>
                    </Paper>
                </div>
                <Posts />
            </div>
            <aside className="hidden md:flex flex-col items-stretch pb-6 w-[300px]">
                <KnownPeople />
                <AdBanner />
            </aside>
        </div>
    );
};

export default Feed;