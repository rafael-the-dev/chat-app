import { Avatar, IconButton, Typography } from "@mui/material"
import classNames from "classnames"
import classes from './styles.module.css'
import { useMutation } from "@apollo/client"

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { REJECT_GROUP_INVITATION } from "src/graphql/mutations"

const GroupsInvitations = ({ groupID, ID, image, name, sender }) => {
    const rejectGroupInvitationMutation = useMutation(REJECT_GROUP_INVITATION);

    console.log(groupID, ID)

    const rejectHandler = () => {
        const rejectInvitation = rejectGroupInvitationMutation[0];

        rejectInvitation({
            variables: {
                groupID,
                ID
            },
            onError(error) {
                console.log(error)
            }
        })
    };

    return (
        <li className={classNames(classes.container, "last:border-b-0")}>
            <div className={classNames(classes.card, "flex items-center justify-between py-2 px-5")}>
                <div className="flex items-center">
                    <Avatar 
                        className="h-[40px] text-base w-[40px]"
                        imgProps={{ loading: "lazy" }}
                        src={image ? `http://localhost:5000/${image}` : ""}>
                    </Avatar>
                    <div className="ml-3">
                        <Typography
                            className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                            component="h2">
                            { name }
                        </Typography>
                        <Typography className="max-w-[230px] text-sm text-slate-500" component="p">
                            @{ sender }
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center">
                    <IconButton 
                        className="border border-solid border-red-500 p-[.2rem] hover:bg-red-500"
                        onClick={rejectHandler}>
                        <CloseIcon className="text-red-500 text-[1.4rem] hover:text-white" />
                    </IconButton>
                    <IconButton 
                        className="border border-solid border-cyan-500 bg-cyan-500 ml-2 p-[.2rem] 
                        hover:bg-transparent">
                        <CheckIcon className="text-white text-[1.4rem] hover:text-cyan-500" />
                    </IconButton>
                </div>
            </div>
        </li>
    );
};

export default GroupsInvitations;