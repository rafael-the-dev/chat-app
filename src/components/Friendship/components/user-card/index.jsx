import { Avatar, IconButton, Typography } from "@mui/material";
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useCallback, useContext, useState } from "react";
import { AppContext } from "src/context/AppContext";
import classNames from 'classnames'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import classes from './styles.module.css'

const Container = ({ image, name, username }) => {
    const { getInitialsNameLetters, getBgColors } = useContext(AppContext);
    const [ open, setOpen ] = useState(false);
    const [ expanded, setExpanded ] = useState(false);

    const toggleDialog = useCallback(prop => () => setOpen(prop), []);
    const toggleExpand = useCallback(() => setExpanded(b => !b), []);
    const sendInvitation = useCallback(() => {}, [])
    
    return (
        <article className={classNames(classes.card, `flex items-center py-2 last:border-0`)}>
            <Avatar 
                src={image ? `http://localhost:5000/${image}` : ""}
                style={{ backgroundColor: image ? "transparent" : getBgColors()[username] }} 
                className="text-base">
                { image ? "" :getInitialsNameLetters(name) }
            </Avatar>
            <div className="flex flex-col grow ml-3">
                <Typography 
                    className={classNames("font-semibold max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                    component="h2">
                    { name }
                </Typography>
                <Typography className={classNames("mt-1")}>
                    @{ username }
                </Typography>
            </div>
            <IconButton 
                className="ml-3"
                onClick={toggleDialog(true)}>
                <PersonAddIcon className="opacity-80 text-blue-600" />
            </IconButton>
            <Dialog
                open={open}
                onClose={toggleDialog(false)}
                aria-describedby="session-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="session-dialog-description">
                        You can add a description to personalize your invitation to 
                        <span className="font-bold ml-2">{username}</span>.
                    </DialogContentText>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <form className="flex flex-col items-stretch mt-4 w-full">
                            <Typography 
                                component="label" 
                                htmlFor="description-input">
                                Message (Optional)
                            </Typography>
                            <textarea 
                                className="border-cyan-500 mt-3 text-base outline-cyan-800"
                                id="description-input"
                                placeholder="Insert your message"

                                rows="6"
                            ></textarea>
                        </form>
                    </Collapse>
                </DialogContent>
                <DialogActions className="pb-4">
                    <Button 
                        variant="contained"
                        type="button"
                        className={classNames(`bg-transparent border border-solid border-slate-200 hover:bg-red-500
                        capitalize shadow-none text-gray-600 hover:opacity-80 hover:text-slate-200 hover:border-0`)}
                        onClick={toggleExpand}>
                        { expanded ? "cancel" : "Add a description" }
                    </Button> 
                    <Button 
                        variant="contained"
                        type="button"
                        className={classNames("capitalize ml-2 sm:mr-4 hover:bg-red-500", )}
                        onClick={sendInvitation}>
                        Send
                    </Button>    
                </DialogActions>
            </Dialog>
        </article>
    );
};

export default Container;