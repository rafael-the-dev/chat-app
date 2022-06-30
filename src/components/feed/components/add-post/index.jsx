import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { useCallback, useMemo, useRef, useState, useTransition } from "react"
import { styled } from "@mui/material/styles";

import classNames from "classnames"

import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';

import Image from "src/components/image-collapse"
import TextField from "./components/textfield"

const CustomButton = styled(Button)({
    ".dark &.Mui-disabled": {
        backgroundColor: "#78716c"
    }
})

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

const CreatePost = () => {
    const [ open, setOpen ] = useState(false);
    const [ file, setFile ] = useState({ image: null, url: "" });
    const [ value, setValue ] = useState("")

    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const imageRef = useRef(null);

    const deleteImage = useCallback(() => {
        setFile({ image: null, url: "" });
    }, []);

    const imageMemo = useMemo(() => <Image deleteImage={deleteImage} file={file} />, [ deleteImage, file ]);
    const textFieldMemo = useMemo(() => <TextField file={file} ref={inputRef} />, [ file ])

    const switchState = useCallback(prop =>  setOpen(prop), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const fileChangeHandler = useCallback(event => {
        const inputFile = event.target.files[0];

        if(inputFile) {
           const reader = new FileReader();

            reader.onload = event => { 
                imageRef.current = inputFile;
               setFile({ image: inputFile, url: event.target.result })
            };

           reader.readAsDataURL(inputFile);
        }
    }, [ imageRef ]);

    const imageButtonClickHandler = useCallback(() => {
        fileRef.current?.click();
    }, [ ]);

    return (
        <>
            <Button
                className="rounded-lg"
                onClick={() => switchState(true)}
                variant="contained">
                add new post
            </Button>
            <Dialog
                classes={{ paper: classNames("px-4 md:min-w-[450px] dark:bg-stone-500") }}
                open={open}
                onClose={handleClose}
                aria-describedby="session-dialog-description"
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Create a post
                </BootstrapDialogTitle>
                <DialogContent className="px-0">
                    { imageMemo }
                    { textFieldMemo }
                    <input 
                        className="hidden" 
                        ref={fileRef} 
                        type="file" 
                        onChange={fileChangeHandler} 
                    />
                </DialogContent>
                <DialogActions className="flex items-center justify-between px-0 pb-4 w-full">
                    <IconButton onClick={imageButtonClickHandler}>
                        <ImageIcon className="dark:text-slate-400" />
                    </IconButton>
                    <div className="flex">
                        <Button 
                            className={classNames(`bg-transparent border border-solid border-red-500 
                            capitalize text-red-500 hover:bg-red-500 hover:text-white`)}
                            variant="contained"
                            type="button"
                            onClick={handleClose}>
                            Close 
                        </Button> 
                        <CustomButton 
                            disabled={!Boolean(file.image) && !Boolean(value.trim())}
                            variant="contained"
                            type="button"
                            className={classNames("border capitalize ml-3 px-8 hover:bg-transparent hover:border-solid hover:text-blue-500 hover:border-blue-500")}
                            onClick={() => {}}>
                            post
                        </CustomButton>   
                    </div> 
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreatePost;