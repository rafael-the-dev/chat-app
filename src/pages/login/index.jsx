import { Alert, AlertTitle, Button, IconButton, Paper, Typography } from '@mui/material';
import { useCallback, useContext, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
//import client from "src/graphql/apollo-client"

import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import classNames from 'classnames'
import classes from "./styles.module.css"
import { useMutation } from '@apollo/client';
import { LOGIN } from 'src/graphql/mutations';
import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from 'src/context/AppContext';
//import { GET_FEEDBACKS } from 'src/graphql/queries'
import Input from 'src/components/Input';

const Container = () => {
    const { addUser } = useContext(LoginContext)
    const { errorHandler, startLoading, stopLoading } = useContext(AppContext);
    //console.log(client)
    const loginMutation = useMutation(LOGIN)
    const router = useRouter()

    const alertRef = useRef(null);
    const userNameRef = useRef(null);
    const [ values, setValues ] = useState({
        password: '',
        showPassword: false,
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = useCallback(() => {
        setValues(currentValues => ({
          ...currentValues,
          showPassword: !currentValues.showPassword
        }));
    }, []);

    const handleChange = useCallback((prop) => (event) => {
        setValues(currentValues => ({ ...currentValues, [prop]: event.target.value }));
    }, []);

    const onSubmitHandler = event => {
        event.preventDefault();
        alertRef.current.classList.add("hidden");
        
        let username = userNameRef.current.value;
        let password = values.password;
        const signIn = loginMutation[0];

        if(username.trim() !== '' && password.trim() !== '') {
            startLoading();
            signIn({ 
                variables: {
                    username,
                    password
                },
                async onCompleted(data) {
                    localStorage.setItem("__chat-app--token", JSON.stringify(data.login.acessToken))
                    //console.log(data)
                    addUser({ image: data.login.image, name: data.login.name, username: data.login.username });
                    stopLoading();
                    //refreshAllFeedbacks();
                    router.push('/');
                },
                onError(err) {
                    stopLoading();
                    console.log(err)
                    err.graphQLErrors.forEach(error => {
                        if(error.extensions.code === "BAD_USER_INPUT" && error.message === "Username or password Invalid") {
                            alertRef.current.classList.remove("hidden")
                        }
                    })
                }
            });
        } 
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full px-5 md:px-0">
            <Paper 
                className={classNames(classes.loginContainer, `px-5 py-8 w-full md:px-6`)}
                component="form"
                elavation={0}
                onSubmit={onSubmitHandler}>
                <Typography className="font-bold mb-8 text-center text-2xl uppercase">
                    Login
                </Typography>
                <Alert className={classNames("hidden mb-4")} ref={alertRef} severity="error">
                    <AlertTitle>Error</AlertTitle>
                   Username or password invalid!
                </Alert>
                <fieldset>
                    <div className={classNames(`bg-cyan-300 flex items-center mt-4 px-3 rounded-lg`)}>
                        <AccountCircle className="text-slate-700" />
                        <Input 
                            className="grow"
                            placeholder="Username"
                            ref={userNameRef}
                            required
                        />
                    </div>
                    <div className={classNames(`bg-cyan-300 flex items-center mt-4 px-3 rounded-lg`)}>
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="start"
                        >
                            { values.showPassword ? <VisibilityOff className="text-slate-700" /> : <Visibility className="text-slate-700" />}
                        </IconButton>
                        <Input 
                            className="grow"
                            placeholder="Username"
                            required
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                        />
                    </div>
                    <div 
                        className={classNames("flex flex-col sm:flex-row-reverse sm:items-center mt-6")}>
                        <Typography component="p" className="ml-4 text-sm">
                            don't you have an account? 
                            <Link href="/signup">
                                <a 
                                    className={classNames(classes.signUpLink, 
                                    "ml-2 text-blue-700 uppercase underline hover:opacity-90")}>
                                    sign up.
                                </a>
                            </Link>
                        </Typography>
                        <Button 
                            className="bg-cyan-500 mt-6 py-3 sm:mt-0 rounded-2xl text-base "
                            variant="contained"
                            type="submit"
                        >Submit
                        </Button>
                    </div>
                </fieldset>
            </Paper>
        </div>
    );
};

export default Container;

/**
 * <TextField
                        id="username-textfield"
                        label="Username"
                        fullWidth
                        className={classNames("mt-4")}
                        inputRef={userNameRef}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            )
                        }}
                        required
                        variant="outlined"
                    />
                    <FormControl fullWidth variant="outlined" className={classNames("mt-6")}>
                        <InputLabel htmlFor="password-textfield">Password</InputLabel>
                        <OutlinedInput
                            id="password-textfield"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            required
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="start"
                                    >
                                        { values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
 */