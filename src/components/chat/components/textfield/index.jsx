import { IconButton } from "@mui/material"

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';

const TextfieldContainer = () => {
    return (
        <form className="bg-cyan-300 flex items-center">
            <IconButton>
                <InsertEmoticonIcon className="hover:text-cyan-600" />
            </IconButton>
            <input 
                className="bg-transparent grow p-2 text-base focus:outline-cyan-600"
            />
            <IconButton>
                <SendIcon className="hover:text-cyan-600" />
            </IconButton>
        </form>
    );
};

export default TextfieldContainer;