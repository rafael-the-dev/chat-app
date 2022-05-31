import { IconButton, Typography } from "@mui/material"
import classNames from 'classnames';

import CloseIcon from '@mui/icons-material/Close';

const RepliedMessage = () => {
    return (
        <div className={classNames("border-l-2 border-solid flex flex-col bg-slate-50 mx-3 mb-3 p-1 pl-2 rounded-lg border-cyan-700")}>
            <IconButton className="p-1 self-end">
                <CloseIcon className="text-sm" />
            </IconButton>
            <Typography className="text-cyan-700" component="h2">
                you
            </Typography>
            <Typography className="text-base text-slate-500" component="p">
                Hello how are you?
            </Typography>
        </div>
    );
};

export default RepliedMessage;