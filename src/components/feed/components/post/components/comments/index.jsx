import { Button } from "@mui/material"
import { useRef } from "react"
import Link from "next/link"

import Dialog from "./components/dialog"

const Container = ({ author, comments, ID, likes }) => {
    const handleOpenRef = useRef(null);
    
    return (
        comments.length > 0 && (
            <div className="px-2 md:px-4">
                <Link href={`/?dialog=posts&id=${ID}`}>
                    <a>
                        <Button 
                            className="normal-case text-zinc-500" 
                            onClick={() => handleOpenRef.current?.()}>
                            View { comments.length > 1 ? `all ${comments.length} comments` : `1 comment` }
                        </Button>
                    </a>
                </Link>
            </div>
        )
    );
};

export default Container;

/**
 * 
                <Dialog 
                    author={author} 
                    comments={comments} 
                    handleOpenRef={handleOpenRef} 
                    ID={ID}
                    likes={likes}
                />
 */