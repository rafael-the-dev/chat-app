import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({ 
    header: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '5%',
            paddingRight: '5%'
        },
        [theme.breakpoints.up('md')]: {
            width: 300,
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    headerHighlight: {
        backgroundImage: 'linear-gradient(205deg, #E84D70, #A337F6, #28A7ED)',
        [theme.breakpoints.up('sm')]: {
            borderRadius: 12,
            width: '31%'
        },
        [theme.breakpoints.up('md')]: {
            width: 300
        }
    },
    drawerRoot: {
        top: '86px !important',
        '& .MuiBackdrop-root': {
            top: '86px !important',
        }
    },
    drawerPaper: {
        top: '86px !important',
        width: '80%'
    },
    drawerContent: {
        backgroundColor: '#F2F4FF'
    },
    paper: {
        borderRadius: '12px !important',
        [theme.breakpoints.up('sm')]: {
            width: '31%'
        },
        [theme.breakpoints.up('md')]: {
            width: '100%'
        }
    },
    smPx: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '2%',
            paddingRight: '2%'
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: '5%',
            paddingRight: '5%'
        }
    },
    roadmapTitle: {
        color: '#3A4374'
    },
    roadmapState: {
        color: '#647196'
    },
    roadmapStateText: {
        '&::before': {
            borderRadius: '50%',
            content: '""',
            display: 'inline-block',
            height: 13,
            marginRight: 13,
            width: 13
        }
    },
    roadmapStateTextPlanned: {
        '&::before': {
            backgroundColor: '#F49F85'
        }
    },
    roadmapStateTextInProgress: {
        '&::before': {
            backgroundColor: '#AD1FEA'
        }
    },
    roadmapStateTextLive: {
        '&::before': {
            backgroundColor: '#62BCFA'
        }
    },
    chip: {
        backgroundColor: '#CFD7FF !important',
        color: '#4661E6 !important'
    }
}));