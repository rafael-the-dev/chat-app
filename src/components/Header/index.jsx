import { Chip, Drawer, Hidden, IconButton, Paper, Typography } from '@mui/material';
import classNames from 'classnames'
//import { useDisplay, useGlobalStyles, useResponsive, useTypography } from 'src/styles'
import MenuIcon from '@mui/icons-material/Menu';
import classes from './header.module.css'
import { useCallback, useContext, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
//import { useSelector } from 'react-redux'
//import { selectAllProducts } from 'src/redux/selectors'
import { AppContext } from 'src/context/AppContext'

const Header = () => {
    //const classes = useStyles();
    //const display = useDisplay();
    //const globalStyles = useGlobalStyles();
    //const responsive = useResponsive();
   // const text = useTypography();

    const { feedbacksList } = useContext(AppContext);

    const [ open, setOpen ] = useState(false);
    const closeMenu = useCallback(() => setOpen(false), []);
    const toggleMenu = useCallback(() => setOpen(o => !o), []);

    const plansTotal = useMemo(() => {
        const total = { planned: 0, inProgress: 0, live: 0 };
        feedbacksList
            .forEach(item => {
                if(item.status === 'planned') {
                    total.planned += 1;
                } else  if(item.status === 'in-progress') {
                    total.inProgress += 1;
                } else if(item.status === 'live') {
                    total.live += 1;
                }
            });
        return total;
    }, [ feedbacksList ]);

    const CustomChip = useCallback(({ label }) => (
        <Chip
            label={ label }
            onClick={() => {}}
            className={classNames("mr-4 mb-4", classes.chip)} 
        />
    ), [ ]);

    const chipCategories = useMemo(() => (
        feedbacksList.map(item => item.category)
    ), [ feedbacksList ])

    const drawerContent = useMemo(() => (
        <>
            <Paper 
                className={classNames("flex flex-wrap items-center pt-4 pb-8 px-5 md:mt-4",
                classes.paper, classes.smPx)}
                elevation={0}>
                    {
                        [ ...new Set(chipCategories) ].map((item, index) => (
                            <CustomChip key={index} label={ item } />
                        ))
                    }
            </Paper>
            <Paper 
                className={classNames("flex flex-wrap items-center pt-4 pb-8 px-5 md:mt-4",
                classes.paper, classes.smPx)}
                elevation={0}>
                    <header className={classNames("flex items-center justify-between w-full")}>
                        <Typography component="h2" className={classNames(classes.roadmapTitle)}>Roadmap</Typography>
                        <Link 
                            href="/roadmap" 
                            className={classNames('text-sky-600 underline-none hover:underline')}>
                            <a>View</a>
                        </Link>
                    </header>
                    <div className={classNames("mt-4 w-full")}>
                        <Typography 
                            className={classNames("flex items-center justify-between", classes.roadmapState)}
                            gutterBottom>
                            <span className={classNames(classes.roadmapStateText, classes.roadmapStateTextPlanned)}>
                                Planned
                            </span>
                            <span className={classNames("font-bold")}>{ plansTotal.planned }</span>
                        </Typography>
                        <Typography 
                            className={classNames("flex items-center justify-between", classes.roadmapState)}
                            gutterBottom>
                            <span className={classNames(classes.roadmapStateText, classes.roadmapStateTextInProgress)}>
                                In-Progress
                            </span>
                            <span className={classNames("font-bold")}>{ plansTotal.inProgress }</span>
                        </Typography>
                        <Typography className={classNames("flex items-center justify-between", classes.roadmapState)}>
                            <span className={classNames(classes.roadmapStateText, classes.roadmapStateTextLive)}>
                                Live
                            </span>
                            <span className={classNames("font-bold")}>{ plansTotal.live }</span>
                        </Typography>
                    </div>
            </Paper>
        </>
    ), [ chipCategories, plansTotal ]);

    return (
        <header className={classNames("sm:px-5 sm:flex sm:justify-between sm:pt-12 sm:pb-8 md:px-0 md:flex-col md:pt-0", 
            classes.header, "sm:items-stretch")}>
            <div
                className={classNames("flex items-center justify-between py-4 px-5 text-white md:pt-12 md:pb-8", 
                classes.headerHighlight, classes.smPx)} >
                <div>
                    <Typography component="h1" variant="h6">Frontend Mentor</Typography>
                    <Typography className={classNames("opacity-90 text-sm")}>Feedback Board</Typography>
                </div>
                <Hidden smUp>
                    <IconButton
                        onClick={toggleMenu}>
                        { open ? <CloseIcon className={classNames("text-white")} /> : <MenuIcon className={classNames("text-white")} /> }
                    </IconButton>
                </Hidden>
            </div>
            <Hidden smDown>
                { drawerContent }
            </Hidden>
            <Hidden smUp>
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={closeMenu}
                    classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
                    >
                    <div className={classNames("h-full px-5 py-8", classes.drawerContent)}>
                        { drawerContent }
                    </div>
                </Drawer>
            </Hidden>
        </header>
    );
};

export default Header;