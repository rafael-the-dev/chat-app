import { Button, Hidden, Paper } from "@mui/material"
import classNames from "classnames"
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

    return (
        <div className={classNames(classes.transition, `flex grow items-stretch pt-8 bg-transitionV h-screen 
            dark:bg-stone-900`, pathname === "/" ? [classes.rootHomePage] : " pr-8")}>
            <div className={classNames(pathname === "/" ? "pl-0 pr-16" : "px-6", "grow")}>
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
                <Posts />
            </div>
            <aside className="flex flex-col items-stretch pb-6 w-[300px]">
                <KnownPeople />
                <AdBanner />
            </aside>
        </div>
    );
};

export default Feed;