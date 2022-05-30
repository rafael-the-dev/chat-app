import { Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormLabel, 
    MenuItem, RadioGroup, Radio, Paper, Typography, TextField } from "@material-ui/core";
import { useCallback, useContext, useMemo, useState } from "react";
import classNames from "classnames";

import ContactCard from "./components/User"
import { AppContext } from "src/context/AppContext"

const ForwardMessageContainer = () => {
    const { getFriendshipsList, openForwardMessageDialog, setOpenForwardMessageDialog } = useContext(AppContext);

    const [ receiverName, setReceiverName ] = useState('');
    const [ receiverType, setReceiverType ] = useState('CONTACT');
    const [ isLoading, setIsLoading ] = useState(false);

    const contactListMemo = useMemo(() => {
        return getFriendshipsList().map((contact, index) => <ContactCard key={index} { ...contact } />)
    }, [ getFriendshipsList ]);

    const closeDialog = useCallback(() => {
        setOpenForwardMessageDialog(false)
    }, [ setOpenForwardMessageDialog ]);

    const radioChangeHandler = useCallback(event => {
        setReceiverType(event.target.value);
        setReceiverName('')
    }, [])

    const onChangeHandler = useCallback(event => {
        setReceiverName(event.target.value);
    }, []);

    return (
        <Dialog
            open={openForwardMessageDialog}
            onClose={closeDialog}
            aria-describedby="session-dialog-description"
        >
            <DialogContent>
                <FormControl fullWidth component="fieldset" 
                    className={classNames("flex items-center")}>
                    <FormLabel component="legend" className={classNames("font-bold w-auto")}>Forward to a</FormLabel>
                    <RadioGroup row aria-label="type of receiver" name="receiver" 
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
            </DialogContent>
            <DialogActions className="pb-4">
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
                    className={classNames("capitalize sm:mr-4")}
                    onClick={() => {}}>
                    Send
                </Button>    
            </DialogActions>
        </Dialog>
    );
};

export default ForwardMessageContainer;