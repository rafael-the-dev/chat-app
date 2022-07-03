import { useState } from "react"
import { Button, IconButton, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const CustomTextfield = styled(TextField)({
    '& .MuiOutlinedInput-input': {
        padding: '7.5px 8px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    }
})

const Form = ({ ID }) => {

    return (
        <form className="border-t border-solid border-slate-200 flex items-center mt-4 pl-4 pr-3 py-2">
            <IconButton>
                <InsertEmoticonIcon />
            </IconButton>
            <CustomTextfield 
                className="border-0 grow py-0"
                placeholder="Add a comment..."
            />
            <Button>Post</Button>
        </form>
    );
};

export default Form;