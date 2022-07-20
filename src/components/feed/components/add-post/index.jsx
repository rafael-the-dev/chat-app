import { Alert, Button, DialogActions, DialogContent, IconButton } from "@mui/material"
import { useCallback, useMemo, useRef, useState, useTransition } from "react"

import classNames from "classnames"
import classes from "./styles.module.css"

import ImageIcon from '@mui/icons-material/Image';

import Dialog from "src/components/dialog"
import Header from "src/components/dialog/components/dialog-header"
import Image from "src/components/image-collapse"
import TextField from "./components/textfield"
import SendButton from "./components/send-button"
import { closeAlert, openAlert } from "src/helpers/alert"

const CreatePost = () => {
    const [ file, setFile ] = useState({ image: null, url: "" });
    const [ isPending, startTransition ] = useTransition();

    const successAlert = useRef(null);
    const errorAlert = useRef(null);
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const imageRef = useRef(null);
    const setButtonValue = useRef(null);
    const setTextfieldValue = useRef(null);
    const openHandler = useRef(null);
    const closeHandler = useRef(null);

    const deleteImage = useCallback(() => {
        setFile({ image: null, url: "" });
    }, []);

    const onSubmit = useCallback(() => {
        closeAlert(errorAlert)();
        closeAlert(successAlert)();
    }, [])

    const onError = useCallback(() => {
        openAlert(errorAlert)();
    }, [])

    const onSucess = useCallback(() => {
        openAlert(successAlert)();
        setTextfieldValue.current?.();
        startTransition(() => setFile({ image: null, url: "" }));
    }, []);

    const imageButtonClickHandler = useCallback(() => {
        fileRef.current?.click();
    }, [ ]);

    const imageMemo = useMemo(() => <Image deleteImage={deleteImage} file={file} />, [ deleteImage, file ]);
    const textFieldMemo = useMemo(() => (
        <TextField 
            file={file} 
            ref={inputRef} 
            setInputValue={setButtonValue} 
            setTextfieldValue={setTextfieldValue}
        />
    ), [ file ]);

    const emptyImageContainer = useMemo(() => {
        return (
            <div 
                className={classNames(classes.addImageContainer, `border border-solid border-cyan-500 
                flex flex-col items-center justify-center`)}>
                <ImageIcon className={classNames(classes.addImageIcon, "text-cyan-500")} />
                <Button 
                    className="mt-3" 
                    onClick={imageButtonClickHandler}>
                    Select from your computer
                </Button>
            </div>
        )
    }, [ imageButtonClickHandler ])

    const sendButton = useMemo(() => (
        <SendButton 
            file={file} 
            inputRef={inputRef} 
            onError={onError}
            onSubmit={onSubmit}
            onSucess={onSucess}
            setButtonValue={setButtonValue} 
        />
    ), [ file, onError, onSubmit, onSucess ]);

    const handleClose = useCallback(() => closeHandler.current?.(), []);

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

    return (
        <>
            <Button
                className="rounded-lg"
                onClick={() => openHandler.current?.()}
                variant="contained">
                add new post
            </Button>
            <Dialog
                ariaDescribedby="session-dialog-description"
                closeHandler={closeHandler}
                openHandler={openHandler}
                dialogPaper={classNames(classes.paper, "px-4 dark:bg-stone-500")}
            >
                <Header id="customized-dialog-title" onClose={handleClose}>
                    Create new post
                </Header>
                <DialogContent className="px-0">
                    <Alert 
                        className="hidden mb-3" 
                        color="error"
                        ref={errorAlert} 
                        severity="error" 
                        onClose={closeAlert(errorAlert)}>
                        Error while adding your post, please try again.
                    </Alert>
                    <Alert 
                        className="hidden mb-"
                        color="info" 
                        ref={successAlert} 
                        severity="success"  
                        onClose={closeAlert(successAlert)}
                    >
                        Your post was successfully added!
                    </Alert>
                    { !file.image && emptyImageContainer }
                    { imageMemo }
                    { textFieldMemo }
                    <input 
                        accept="image/png, image/jpg, image/jpeg"
                        className="hidden" 
                        ref={fileRef} 
                        type="file" 
                        onChange={fileChangeHandler} 
                    />
                </DialogContent>
                <DialogActions 
                    className={classNames("flex items-center px-0 pb-4 w-full",
                    file.image ? "justify-between" : "justify-end")}>
                    {file.image && <IconButton onClick={imageButtonClickHandler}>
                        <ImageIcon className="dark:text-slate-400" />
                    </IconButton> }
                    <div className="flex">
                        <Button 
                            className={classNames(`bg-transparent border border-solid border-red-500 
                            capitalize text-red-500 hover:bg-red-500 hover:text-white`)}
                            variant="contained"
                            type="button"
                            onClick={handleClose}>
                            Close 
                        </Button> 
                        { sendButton }
                    </div> 
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreatePost;