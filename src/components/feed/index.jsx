import { Button, Hidden, Paper } from "@mui/material"
import classNames from "classnames"

import classes from "./styles.module.css"

import AdBanner from "./components/ad-banner"
import KnownPeople from "./components/known-people"
import Avatar from "../logged-user-avatar"
import Input from "./components/search-input"
import AddPost from "./components/add-post"

const Feed = () => {
    return (
        <div className="flex grow items-stretch pt-8 pr-8 bg-transition dark:bg-stone-900">
            <div className="grow px-6">
                <Paper className={classNames(classes.postsPanel, `bg-transition flex items-center 
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
            <aside className="flex flex-col items-stretch pb-6 w-[300px]">
                <KnownPeople />
                <AdBanner />
            </aside>
        </div>
    );
};

export default Feed;