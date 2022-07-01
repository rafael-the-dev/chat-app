import { useCallback, useContext, useEffect, useId, useState, useTransition } from "react"
import classNames from "classnames"
import classes from "./styles.module.css"
import { Button } from "@mui/material"

import Card from "../post"
import { AppContext } from "src/context"

const PostsContainer = () => {
    const [ posts, setPosts ] = useState([]);
    const [ buttonProperties, setButtonProperties ] = useState({ hasNewPosts: false, loading: false });
    const [ isPending, startTransition ] = useTransition();
    const id = useId();

    const { hasNewPosts, loading } = buttonProperties;

    const { getPosts } = useContext(AppContext);

    const clickHandler = useCallback(() => {
        setButtonProperties(currentProperties => ({ ...currentProperties, loading: true }));
        setTimeout(() => {
            setPosts(getPosts());
            startTransition(() => {
                setButtonProperties({ hasNewPosts: false, loading: false });
            });
        }, 1500)
    }, [ getPosts ])

    useEffect(() => {
        setPosts(currentPosts => {
            if(currentPosts.length === 0) {
                return getPosts();
            }

            startTransition(() => setButtonProperties({ hasNewPosts: true, loading: false }));
            return currentPosts;
        })
    }, [ getPosts ])

    return (
        <div className="mt-6 relative">
            <Button 
                className={classNames(classes.button, { "opacity-0": !hasNewPosts },
                "absolute rounded-xl top-0 z-10")}
                disabled={!hasNewPosts}
                onClick={clickHandler}
                variant="contained">
                { loading ? "Loading..." : "New Posts" }
            </Button>
            <ul 
                className={classNames(classes.postsContainer, "overflow-y-auto",
                hasNewPosts ? "mt-8" : "mt-6")}>
                {
                    posts.map(post => <Card key={`${id}-${post.ID}`} { ...post } />)
                }
            </ul>
        </div>
    );
};

export default PostsContainer;