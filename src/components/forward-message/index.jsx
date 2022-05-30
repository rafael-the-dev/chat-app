import { Avatar, Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormLabel,
    MenuItem, RadioGroup, Radio, Typography, TextField } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";

import CircleIcon from '@mui/icons-material/Circle';
import { getInitialsNameLetters } from "src/helpers"
import classNames from "classnames";
import classes from "./styles.module.css"

import ContactCard from "./components/User"
import { AppContext } from "src/context/AppContext"
import { ForwardMessage } from "src/context"

const ForwardMessageContainer = () => {
    const { getFriendshipsList } = useContext(AppContext);
    const { openForwardMessageDialog, setOpenForwardMessageDialog } = useContext(ForwardMessage);

    const [ receiverName, setReceiverName ] = useState('');
    const [ receiverType, setReceiverType ] = useState('CONTACT');
    const [ isLoading, setIsLoading ] = useState(false);

    const closeDialog = useCallback(() => setOpenForwardMessageDialog(false), [ setOpenForwardMessageDialog ])

    const radioChangeHandler = useCallback(event => {
        setReceiverType(event.target.value);
        setReceiverName('');
    }, [])

    const onChangeHandler = useCallback(event => {
        setReceiverName(event.target.value);
    }, []);
    
    const contactListMemo = useMemo(() => {
        return getFriendshipsList().map((contact, index) => (
            <MenuItem key={contact.username} className="" value={contact.username} >
                <div className={classNames("flex items-center w-full")}>
                    <Avatar 
                        className="h-[25px] text-base w-[25px]"
                        src={contact.image ? `http://localhost:5000/${contact.image}` : ""}>
                        { contact.image ? "" :getInitialsNameLetters(contact.name) }
                    </Avatar>
                    <Typography 
                        className={classNames("font-semibold grow ml-3 max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                        component="h2">
                        { contact.name }
                    </Typography>
                    <CircleIcon className={classNames("text-[.5rem]", contact.isOnline ? "text-green-500" : "text-red-500")} />
                </div>
            </MenuItem>
        ))
    }, [ getFriendshipsList ]);

    return (
        <Dialog
            aria-describedby="session-dialog-description"
            classes={{ paper: classes.dialogPaper }}
            open={openForwardMessageDialog}
            onClose={closeDialog}
        >
            <DialogContent>
                <FormControl fullWidth component="fieldset" 
                    className={classNames("flex items-center")}>
                    <FormLabel component="legend" className={classNames("font-bold w-auto")}>Forward to a</FormLabel>
                    <RadioGroup className="w-full" row aria-label="type of receiver" name="receiver" 
                        defaultValue="top" value={receiverType}  onChange={radioChangeHandler}>
                        <FormControlLabel
                            value="CONTACT"
                            control={<Radio color="primary" />}
                            label="Contact"
                            labelPlacement="start"
                            className={classNames("ml-0")}
                        />
                        <FormControlLabel
                            value="GROUP"
                            control={<Radio color="primary" />}
                            label="Group"
                            labelPlacement="start"
                        />
                    </RadioGroup>
                </FormControl>
                <TextField
                    className="mt-4"
                    id="outlined-required"
                    label="Select a receiver"
                    required
                    variant="outlined"
                    select
                    value={receiverName}
                    onChange={onChangeHandler}
                    fullWidth
                >{ receiverType === 'CONTACT' ? contactListMemo : <></> }
                </TextField>
                <div className="flex justify-end mt-4">
                    <Button 
                        variant="contained"
                        type="button"
                        className={classNames(`bg-transparent border border-solid border-red-500 text-red-500 
                        shadow-none hover:bg-red-500 capitalize hover:text-slate-100 hover:opacity-80`)}
                        onClick={closeDialog}>
                        Cancel
                    </Button> 
                    <Button 
                        variant="contained"
                        type="button"
                        className={classNames("capitalize ml-4 px-6 hover:opacity-70")}
                        onClick={() => {}}>
                        Send
                    </Button>   
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ForwardMessageContainer;