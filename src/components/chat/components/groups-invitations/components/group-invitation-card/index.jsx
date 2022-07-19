import { Avatar, Typography } from "@mui/material"
import classNames from "classnames"
import classes from './styles.module.css'
import Link from "next/link"

import RejectButton from "./components/reject-button"
import AcceptButton from "./components/accept-button"

const GroupsInvitations = ({ groupID, ID, image, name, sender }) => {
    
    return (
        <li className={classNames(classes.container, "last:border-b-0")}>
            <div className={classNames(classes.card, "flex items-center justify-between py-2 px-5 sm:px-2")}>
                <div className="flex items-center">
                    <Avatar 
                        className="h-[40px] text-base w-[40px]"
                        imgProps={{ loading: "lazy" }}
                        src={image ? `http://localhost:5000/${image}` : ""}>
                    </Avatar>
                    <div className="ml-3">
                        <Typography
                            className={classNames(classes.name, "font-semibold overflow-hidden text-ellipsis whitespace-nowrap")} 
                            component="h2">
                            { name }
                        </Typography>
                        <Link href={`profile?username=${sender}`}>
                            <a>
                                <Typography 
                                    className={classNames(classes.name, 
                                    "overflow-hidden text-ellipsis text-sm text-slate-500 whitespace-nowrap hover:text-cyan-500")}
                                    component="p">
                                    @{ sender }
                                </Typography>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center">
                    <RejectButton groupID={groupID} ID={ID} />
                    <AcceptButton groupID={groupID} ID={ID} />
                </div>
            </div>
        </li>
    );
};

export default GroupsInvitations;