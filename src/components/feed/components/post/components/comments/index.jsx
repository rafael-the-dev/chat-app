import { Button } from "@mui/material"

const Container = ({ comments }) => {
    return (
        comments.length > 1 && (
            <div className="px-4">
                <Button className="normal-case text-zinc-500" >
                    View { comments.length > 1 ? `all ${comments.length} comments` : `1 comment` }
                </Button>
            </div>
        )
    );
};

export default Container;