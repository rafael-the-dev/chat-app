import { Button, Hidden, IconButton, Typography } from "@mui/material"
import classNames from "classnames"
import { useCallback, useContext, useMemo, useRef } from "react"
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client"
import Link from "next/link"

import classes from "./styles/index.module.css"
import SettingsIcon from '@mui/icons-material/Settings';

import { AppContext, LoginContext } from "src/context"
import { GET_USER_DETAILS } from "src/graphql/queries"
import { getUserDetails } from "src/helpers/user"

import Container from "src/components/container"
import Tabs from "src/components/settings-tabs"
import Loading from "src/components/loading"
import Avatar from "src/components/avatar";
import Text from "./components/text"
import Card from "./components/post-card"
import Error from "./components/error"
import EditDetails from "./components/edit-details"

const ProfileContainer = () => {
    const router = useRouter();
    const { username } = router.query;

    const { getUsersList } = useContext(AppContext)
    const { loggedUser } = useContext(LoginContext);
    const openDrawerRef = useRef(null);
    const closeDrawerRef = useRef(null);

    const { data, error, loading } = useQuery(GET_USER_DETAILS, { variables: { username: username ? username : loggedUser.username }});
    
    const details = useMemo(() => {
        if(!Boolean(data)) return { friendships: [], name: "", image: "", posts: [] };

        const { user } = data;

        const result = getUserDetails({ list: getUsersList(), username: user.username });

        return { ...user, ...result };

    }, [ data, getUsersList ]);


    if(loading) return <Container><Loading /></Container>;

    if(error) return <Container><Error /></Container>;

    return (
        <>
            <Container>
                <Tabs />
                <div className={classNames(classes.subContainer, "flex flex-col items-center overflow-y-auto pt-4")}>
                    <div className="flex items-center py-6">
                        <Avatar { ...details } className={classes.avatar} />
                        <div className="flex flex-col ml-6">
                            <div className="flex items-center">
                                <Typography 
                                    className="font-bold text-xl md:text-2xl dark:text-slate-300"
                                    component="h2">
                                    { details.name }
                                </Typography>
                                <Hidden smDown>
                                    <Link href="settings">
                                        <a className="ml-4">
                                            <IconButton>
                                                <SettingsIcon className="dark:text-slate-400" />
                                            </IconButton>
                                        </a>
                                    </Link>
                                </Hidden>
                            </div>
                            <div className="flex items-center">
                                <Text label="post" size={details.posts.length} />
                                <Button className="bg-transparent ml-4 normal-case text-black">
                                    <Text label="friend" size={details.friendships.length} />
                                </Button>
                            </div>
                            { loggedUser.username === details.username && <div className="mt-3">
                                <Button 
                                    className="px-12 py-2 border-cyan-700 text-cyan-700 hover:bg-cyan-700 hover:text-white"
                                    onClick={() => openDrawerRef.current?.()}
                                    variant="outlined"
                                    >
                                    Edit profile
                                </Button>
                            </div> }
                        </div>
                    </div>
                    <ul className={classNames("flex flex-wrap md:justify-between mt-6 w-full")}>
                        {
                            details.posts.map(post => <Card key={post.ID} { ...post } />)
                        }
                        { details.posts.length > 4 && details.posts.length % 2 !== 0 && <Card ID="none" />}
                    </ul>
                </div>
                <EditDetails 
                    openHandler={openDrawerRef} 
                />
            </Container>
        </>
    );
};

export default ProfileContainer;