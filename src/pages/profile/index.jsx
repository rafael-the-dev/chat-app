import { Button, Typography } from "@mui/material"
import classNames from "classnames"
import { useCallback, useContext, useMemo } from "react"
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client"

import classes from "./styles/index.module.css"

import { AppContext } from "src/context"
import { GET_USER_DETAILS } from "src/graphql/queries"
import { getUserDetails } from "src/helpers/user"

import Tabs from "src/components/settings-tabs"
import Avatar from "src/components/avatar"

const ProfileContainer = () => {
    const router = useRouter();
    const { username } = router.query;

    const { getUsersList } = useContext(AppContext)
    const { data, error } = useQuery(GET_USER_DETAILS, { variables: { username }});
    
    const details = useMemo(() => {
        if(!Boolean(data)) return { name: "", image: "" };

        const { user } = data;

        const result = getUserDetails({ list: getUsersList(), username: user.username });

        return { ...user, ...result };

    }, [ data, getUsersList ]);


    return (
        <>
            <div className="h-ful sub-root">
                <Tabs />
                <div className="flex flex-col items-center">
                    <Avatar { ...details } className={classes.avatar} />
                    <Typography 
                        className="font-bold text-xl"
                        component="h2">
                        { details.name }
                    </Typography>
                    <Typography 
                        className="max-w-[80%]"
                        component="p">
                        { details.description }
                    </Typography>
                    <ul className="mt-6 w-full">
                        {
                            
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ProfileContainer;