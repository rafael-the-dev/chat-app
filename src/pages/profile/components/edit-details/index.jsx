import { Button, IconButton } from "@mui/material"
import { useCallback, useMemo, useRef, useState } from "react"
import classNames from "classnames"

import Drawer from "src/components/drawer"
import Input from 'src/components/Input';
import Image from 'src/pages/signup/components/Image';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import classes from "./styles.module.css"

const Container = ({ openHandler }) => {
    const [ username, setUsername ] = useState("");
    const nameRef = useRef(null);
    const userNameRef = useRef(null);
    const imageRef = useRef(null);
    const closeHandler = useRef(null);

    const hasErrors = useCallback(({ checkWhiteSpace, checkPasswords, value, value2 }) => {
        let errors = { passwordMatch: false, whiteSpace: false };
        if(!Boolean(value)) return errors;

        if(checkPasswords) {
            if(value2 !== value) {
                errors["passwordMatch"] = true;
            }
        }

        if(checkWhiteSpace) {
            if(value.includes(" ")) {
                errors["whiteSpace"] = true;
            }
        }

        return errors;
    }, []);

    const hasError = useCallback(({ passwordMatch, whiteSpace }) => {
        return passwordMatch || whiteSpace;
    }, []);

    const onCloseHandler = useCallback(() => closeHandler.current?.(), [])

    const usernameErrors = useMemo(() => hasErrors({ checkWhiteSpace: true, value: username }), [  hasErrors, username ])

    const hasUsernameError = useMemo(() => hasError(usernameErrors), [ hasError, usernameErrors ]);

    const profileImageMemo = useMemo(() => <Image imageRef={imageRef} />, [])

    const nameMemo = useMemo(() => (
        <div className={classNames(`bg-cyan-300 flex items-center mt-4 px-3 rounded-lg dark:bg-stone-400`)}>
            <Input 
                id="name-textfield"
                placeholder="Name"
                ref={nameRef}
                required
            />
        </div>
    ), []);

    const inputChangeHandler = useCallback((func) => event => {
        func(event.target.value);
    }, []);

    const usernameMemo = useMemo(() => (
        <div className={classNames(`bg-cyan-300 flex items-center mt-4 px-3 rounded-lg dark:bg-stone-400`)}>
            <Input 
                id="username-textfield"
                error={hasUsernameError}
                placeholder="Username"
                ref={userNameRef}
                required
                onChange={inputChangeHandler(setUsername)}
            />
        </div>
    ), [  hasUsernameError, inputChangeHandler, setUsername ]);

    return (
        <Drawer 
            closeHandler={closeHandler}
            drawerPaper={classes.drawerPaper}
            id={`user-details-drawer`}
            openHandler={openHandler} 
        >
            <div className="flex flex-col h-full items-start px-4 pb-8 pt-3 w-full">
                <IconButton onClick={onCloseHandler}>
                    <ArrowBackIcon />
                </IconButton>
                <form className="flex flex-col grow items-stretch pt-4 w-full">
                    <fieldset className="grow">
                        { profileImageMemo }
                        { nameMemo }
                        { usernameMemo }
                    </fieldset>
                    <div className="flex justify-end">
                        <Button 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
                            onClick={onCloseHandler}
                            variant="outlined">
                            Cancel
                        </Button>
                        <Button 
                            className="ml-4 px-8 hover:opacity-90 hover:cyan-blue-900"
                            variant="contained">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Drawer>
    );
};

export default Container;