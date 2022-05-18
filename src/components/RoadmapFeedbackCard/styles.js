import { makeStyles } from '@mui/styles';
import commentsIcon from '../../assets/images/icons/icon-comments.svg'

export const useStyles = makeStyles(theme => ({ 
    paper: {
        borderRadius: '12px !important',
        [theme.breakpoints.up('sm')]: {
            //width: '95%'
        }
    },
    content: {
        [theme.breakpoints.up('sm')]: {
        }
    },
    darkBlueColor: {
        color: '#3A4374 !important'
    },
    description: {
        color: '#647196'
    },
    chip: {
        backgroundColor: '#F2F4FF !important',
        color: '#4661E6 !important'
    },
    button: {
        backgroundColor: '#F2F4FE',
        borderRadius: 12,
        padding: '.3rem .7rem',
        [theme.breakpoints.up('sm')]: {
            padding: '.5rem .4rem'
        }
    },
    buttonArrow: {
        color: '#4661E6 !important'
    },
    buttonText: {
        marginLeft: 7,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0,
            marginTop: 5
        }
    },
    commentButton: {
        fontSize: '1.01rem',
        '&::before': {
            backgroundImage: `url(${commentsIcon})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            content: '""',
            display: 'inline-block',
            height: 22,
            marginRight: 13,
            width: 22
        }
    },
    statusBar: {
        borderRadius: '12px 12px 0 0',
        height: 7,
        left: 0,
        top: 0
    },
    inProgressStatus: {
        backgroundColor: '#AD1FEA'
    },
    liveStatus: {
        backgroundColor: '#62BCFA'
    },
    plannedStatus: {
        backgroundColor: '#F49F85'
    },
    roadmapStateText: {
        margin: '10px 0 .75rem 0',
        textTransform: 'capitalize',
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
}));