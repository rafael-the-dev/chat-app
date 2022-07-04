import { Button } from "@mui/material"
import { useRef } from "react"

import Dialog from "./components/dialog"

const Container = ({ author, comments }) => {
    const handleOpenRef = useRef(null);

    return (
        comments.length > 1 && (
            <div className="px-4">
                <Button 
                    className="normal-case text-zinc-500" 
                    onClick={() => handleOpenRef.current?.()}>
                    View { comments.length > 1 ? `all ${comments.length} comments` : `1 comment` }
                </Button>
                <Dialog author={author} comments={comments} handleOpenRef={handleOpenRef} />
            </div>
        )
    );
};

export default Container;