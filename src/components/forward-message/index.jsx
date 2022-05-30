import { Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormLabel, IconButton,
    RadioGroup, Radio, Typography, TextField } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

    const contactListMemo = useMemo(() => {
        return getFriendshipsList().map((contact, index) => <ContactCard key={index} { ...contact } />)
    }, [ getFriendshipsList ]);

    const closeDialog = useCallback(() => setOpenForwardMessageDialog(false), [ setOpenForwardMessageDialog ])

    const radioChangeHandler = useCallback(event => {
        setReceiverType(event.target.value);
        setReceiverName('')
    }, [])

    const onChangeHandler = useCallback(event => {
        setReceiverName(event.target.value);
    }, []);

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
                    required
                    id="outlined-required"
                    label="Select a receiver"
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
                        className={classNames('capitalize hover:opacity-80')}
                        onClick={closeDialog}>
                        Cancel
                    </Button> 
                    <Button 
                        variant="contained"
                        type="button"
                        className={classNames("capitalize ml-4")}
                        onClick={() => {}}>
                        Send
                    </Button>   
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ForwardMessageContainer;