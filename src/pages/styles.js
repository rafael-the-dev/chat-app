import { makeStyles } from '@mui/styles';
//import suggestionIcon from '..//images/icons/icon-suggestions.svg'

export const useStyles = makeStyles(theme => ({ 
    toolsContainer: {
        backgroundColor: '#373F68',
        paddingBottom: 10,
        paddingTop: 10,
        [theme.breakpoints.up('sm')]: {
            borderRadius: 12,
            paddingLeft: '1.5rem',
            paddingRight: '1.2rem'
        }
    },
    totalSuggestions: {
        '&::before': {
            backgroundImage: `url(/images/icons/icon-suggestions.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            content: '""',
            display: 'inline-block',
            height: 22,
            marginRight: 10,
            width: 22
        }
    },
    sortHighlightText: {
        marginLeft: 5
    },
    addFeedbackButton: {
        backgroundColor: '#AD1FEA !important',
        borderRadius: '11px !important',
        padding: '9px 16px !important'
    },
    popoverRoot: {
        top: '111px !important'
    },
    filterList: {
        width: 244
    },
    filterListItem: {
        borderBottom: '1px solid #979797d6',
        '&:last-child': {
            borderBottom: 'none'
        },
        '&:hover .MuiTypography-root': {
            color: '#AD1FEA !important',
        }
    },
    filterListItemText: {
        color: '#647196'
    },
    filterListIcon: {
        color: '#AD1FEA !important',
        minWidth: '23px !important'
    }
}));