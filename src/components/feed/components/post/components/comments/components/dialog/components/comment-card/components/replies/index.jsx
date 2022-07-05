import { useCallback, useState } from "react"
import { Button, Collapse } from "@mui/material"

import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import ReplyCard from "../reply-card"

const Container = ({ commentID, postID, replies }) => {
    const [ expanded, setExpanded ] = useState(false);

    const toggleExpanded = useCallback(() => setExpanded(b => !b), [])
    console.log(replies)
    if(replies.length === 0) return <></>;

    return (
        <div className="mt-2">
            <Button 
                className="normal-case py-0 text-zinc-600 hover:text-red-500 hover:bg-transparent"
                onClick={toggleExpanded}
                startIcon={<HorizontalRuleIcon />}>
                { expanded ? "hide" : "show" } replies
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ul className="mt-4">
                    {
                        replies.map(reply => (
                            <ReplyCard 
                                { ...reply } 
                                commentID={commentID} 
                                key={reply.ID} 
                                postID={postID}
                            />
                        ))
                    }
                </ul>
            </Collapse>
        </div>
    );
};

export default Container;