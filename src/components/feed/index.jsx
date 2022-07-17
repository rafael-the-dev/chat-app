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
        if([ '/login', '/signup', "/profile" ].includes(pathname)) {
            return true;
        } 

        return Boolean(page);
    }, [ page, pathname ])

    return (
        <div className={classNames(classes.transition, `grow items-stretch pt-8 md:pt-4 bg-transitionV h-screen 
            dark:bg-stone-900`, pathname === "/" ? [classes.rootHomePage] : classNames(classes.rootOthersPage),
            canIHide ? "hidden" : `${pathname !== "/" ? "hidden md:flex" : "flex"}`)}>
            <div 
                className={classNames(pathname === "/" ? classNames(classes.postsContainer, "xl:pl-0") : classNames(classes.postsContainerOthers, "px-6 md:px-0"), "grow")}>
                <div className={classNames(pathname === "/" ? classes.postsPanelRoot : classes.postsPanelRootOthers, "pl-4 pr-8 md:pl-12 md:pr-16")}>
                    <Paper className={classNames(classes.transition, classes.postsPanel, `bg-transition flex items-center 
                        justify-between px-3 py-2 rounded-xl shadow-none dark:bg-stone-500`)}>
                        <div className="flex">
                            <AddPost />
                        </div>
                        <div className="flex grow justify-end ml-3">
                            <Input />
                            <Hidden mdUp>
                                <Avatar />
                            </Hidden>
                        </div>
                    </Paper>
                </div>
                <Posts pathname={pathname} />
            </div>
            <aside 
                className={classNames("flex-col items-stretch pb-6 w-[300px]",
                pathname === "/" ? classNames(classes.aside, "hidden"): "hidden")}>
                <KnownPeople />
                <AdBanner />
            </aside>
        </div>
    );
};

export default Feed;