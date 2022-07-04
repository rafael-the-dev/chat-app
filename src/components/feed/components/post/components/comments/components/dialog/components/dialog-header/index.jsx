import { Avatar, DialogTitle, IconButton, Typography } from "@mui/material"
import { useContext, useMemo } from "react"
import Link from "next/link"

import CloseIcon from '@mui/icons-material/Close';


import { AppContext } from "src/context"
import { getUserDetails } from "src/helpers/user"

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle className="border-b border-solid border-slate-200 pb-3 dark:text-slate-300" sx={{ m: 0, p: 2, paddingLeft: 0 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};

const DialogHeader = ({ author, onClose }) => {
    const { getUsersList, serverPublicURL } = useContext(AppContext);
    
    const details = useMemo(() => getUserDetails({ list: getUsersList(), username: author }), [ getUsersList, author ]);

    return (
        <BootstrapDialogTitle onClose={onClose}>
            <div className="flex items-center pl-4">
                <Avatar 
                    alt={details.name} 
                    className="h-[40px] w-[40px]"
                    src={`${serverPublicURL.current}/${details.image}`} 
                />
                <Link href={`profile?username=${details.username}`}>
                    <a className="ml-3">
                        <Typography 
                            className="font-medium text-black hover:text-red-500"
                            component="p">
                            { details.name }
                        </Typography>
                    </a>
                </Link>
            </div>
        </BootstrapDialogTitle>
    );
};

export default DialogHeader;