import { makeStyles } from '@mui/styles';
import commentsIcon from '../../assets/images/icons/icon-comments.svg'

export const useStyles = makeStyles(theme => ({ 
    paper: {
        borderRadius: '12px !important',
    },
    clickablePaper: {
        '&:hover': {
            border: '1px solid #4661E6 !important'
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
        '&:hover': { backgroundColor: '#CFD7FF'},
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
    }
}));