import { useCallback, useContext, useEffect, useId, useRef, useState, useTransition } from "react"
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

    const postsContainerRef = useRef(null);

    const { hasNewPosts, loading } = buttonProperties;

    const { getPosts, hasPostUpdate } = useContext(AppContext);

    const clickHandler = useCallback(() => {
        setButtonProperties(currentProperties => ({ ...currentProperties, loading: true }));
        setTimeout(() => {
            setPosts(getPosts());
            startTransition(() => {
                postsContainerRef.current?.scrollTo({ behavior: "smooth", top: 0 })
                setButtonProperties({ hasNewPosts: false, loading: false });
            });
        }, 1500)
    }, [ getPosts ])

    useEffect(() => {
        setPosts(currentPosts => {
            if(currentPosts.length === 0) {
                return getPosts();
            }

            if(!hasPostUpdate.current) {
                startTransition(() => setButtonProperties({ hasNewPosts: true, loading: false }));
            } else {
                hasPostUpdate.current = false;
                return getPosts();
            }

            return currentPosts;
        })
    }, [ getPosts, hasPostUpdate ])

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
                className={classNames(classes.postsContainer, "px-4 pb-12 md:px-0 overflow-y-auto rounded-xl",
                hasNewPosts ? "mt-8" : "mt-6")}
                ref={postsContainerRef}>
                {
                    posts.map(post => <Card key={`${id}-${post.ID}`} { ...post } />)
                }
            </ul>
        </div>
    );
};

export default PostsContainer;