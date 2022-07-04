import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Hidden, IconButton } from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle className="dark:text-slate-300" sx={{ m: 0, p: 2, paddingLeft: 0 }} {...other}>
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

const DialogHeader = ({ onClose }) => {
    return (
        <BootstrapDialogTitle onClose={onClose}>

        </BootstrapDialogTitle>
    );
};

export default DialogHeader;