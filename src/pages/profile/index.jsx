import { Button, Typography } from "@mui/material"
import classNames from "classnames"
import { useCallback, useContext, useMemo } from "react"
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client"

import classes from "./styles/index.module.css"

import { AppContext } from "src/context"
import { GET_USER_DETAILS } from "src/graphql/queries"
import { getUserDetails } from "src/helpers/user"

import Container from "src/components/container"
import Tabs from "src/components/settings-tabs"
import Avatar from "src/components/avatar";
import Text from "./components/text"
import Card from "./components/post-card"

const ProfileContainer = () => {
    const router = useRouter();
    const { username } = router.query;

    const { getUsersList } = useContext(AppContext)
    const { data, error } = useQuery(GET_USER_DETAILS, { variables: { username }});
    
    const details = useMemo(() => {
        if(!Boolean(data)) return { friendships: [], name: "", image: "", posts: [] };

        const { user } = data;

        const result = getUserDetails({ list: getUsersList(), username: user.username });

        return { ...user, ...result };

    }, [ data, getUsersList ]);


    return (
        <>
            <Container>
                <Tabs />
                <div className={classNames(classes.subContainer, "flex flex-col items-center overflow-y-auto pt-4")}>
                    <div className="flex items-center">
                        <Avatar { ...details } className={classes.avatar} />
                        <div className="flex flex-col ml-6">
                            <Typography 
                                className="font-bold text-xl md:text-2xl"
                                component="h2">
                                { details.name }
                            </Typography>
                            <div className="flex items-center">
                                <Text label="post" size={details.posts.length} />
                                <Button className="bg-transparent ml-4 normal-case text-black">
                                    <Text label="friend" size={details.friendships.length} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Typography 
                        className="max-w-[80%]"
                        component="p">
                        { details.description }
                    </Typography>
                    <ul className={classNames("flex flex-wrap md:justify-between mt-6 w-full")}>
                        {
                            details.posts.map(post => <Card key={post.ID} { ...post } />)
                        }
                        { details.posts.length > 4 && details.posts.length % 2 !== 0 && <Card ID="none" />}
                    </ul>
                </div>
            </Container>
        </>
    );
};

export default ProfileContainer;