import Header from 'src/components/Header'
import classNames from 'classnames';
import globalStyles from 'src/styles/global-styles.module.css'
import classes from 'src/styles/Home.module.css'
import { Avatar, Button, Grid, Hidden, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
    Paper, Popover, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCallback, useContext, useMemo, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link'
//import { useSelector } from 'react-redux'
//import { selectAllProducts } from 'src/redux/selectors'

import { AppContext } from "src/context/AppContext"
import { LoginContext } from 'src/context/LoginContext';
//import { feedbacksComponentHelper, FeedbacksContext, FeedbacksContextProvider } from "src/context/FeedbacksContext"

const Home = () => {
    //const classes = useStyles();
    //const globalStyles = useGlobalStyles();
    const { feedbacksList, getInitialsNameLetters } = useContext(AppContext);
    const { logout, user } = useContext(LoginContext);

    return (
        <h1 className="text-red-500">Welcome to my chat app</h1>
    );
    
};

export default Home;