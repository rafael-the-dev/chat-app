import { useCallback, useContext, useEffect, useId, useRef, useState, useTransition } from "react"
import classNames from "classnames"
import classes from "./styles.module.css"
import { Button } from "@mui/material"

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import Card from "../post"
import ScrollButton from "./components/scroll-button"
import { AppContext } from "src/context"

const PostsContainer = ({ pathname }) => {
    const [ posts, setPosts ] = useState([]);
    const [ buttonProperties, setButtonProperties ] = useState({ hasNewPosts: false, loading: false });
    const [ isPending, startTransition ] = useTransition();
    const id = useId();

    const postsContainerRef = useRef(null);
    const onClose = useRef(null);
    const onOpen = useRef(null);

    const { hasNewPosts, loading } = buttonProperties;

    const { getPosts, hasPostUpdate } = useContext(AppContext);

    const scrollToTop = useCallback(() => {
        postsContainerRef.current?.scrollTo({ behavior: "smooth", top: 0 });
    }, [])

    const clickHandler = useCallback(() => {
        setButtonProperties(currentProperties => ({ ...currentProperties, loading: true }));
        setTimeout(() => {
            setPosts(getPosts());
            startTransition(() => {
                scrollToTop();
                setButtonProperties({ hasNewPosts: false, loading: false });
            });
        }, 1500)
    }, [ getPosts, scrollToTop ]);

    const scrollHandler = useCallback(e => {
        const { scrollHeight, scrollTop } = e.target;

        if(scrollHeight / 2 < scrollTop) {
            onOpen.current?.();
        } else {
            onClose.current?.();
        }
    }, [])

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
                "absolute normal-case rounded-xl top-0 z-10")}
                disabled={!hasNewPosts}
                onClick={clickHandler}
                startIcon={!loading && <ArrowUpwardIcon />}
                variant="contained">
                { loading ? "Loading..." : "New Posts" }
            </Button>
            <ul 
                className={classNames(classes.postsContainer, "px-4 pb-12 md:px-12 overflow-y-auto rounded-xl",
                hasNewPosts ? "mt-8" : "mt-6",
                pathname === '/' ? "postsHome": classes.postsContainerOthers)}
                ref={postsContainerRef}
                onScroll={scrollHandler}>
                {
                    posts.map(post => <Card key={`${id}-${post.ID}`} { ...post } />)
                }
            </ul>
            <ScrollButton 
                onClose={onClose} 
                onClick={scrollToTop}
                onOpen={onOpen} 
            />
        </div>
    );
};

export default PostsContainer;