import { makeStyles } from "@mui/styles";

export const useGlobalStyles = makeStyles(theme => ({
    main: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '5%',
            paddingRight: '5%',
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: '10%',
            paddingRight: '10%',
        }
    },
    px: {
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    introTitleBar: {
        '&::before': {
            backgroundColor: '#C8CCD8',
            content: '""',
            display: 'block',
            height: 1,
            marginBottom: '2.4rem',
            width: 90
        },
    },
    button: {
        borderRadius: '11px !important',
        padding: '7px 16px !important'
    },
    addFeedbackButton: {
        backgroundColor: '#AD1FEA !important',
        '&:hover': {
            backgroundColor: '#C75AF6 !important',
        }
    },
    cancelFeedbackButton: {
        backgroundColor: '#3A4374 !important',
        '&:hover': {
            backgroundColor: '#656EA3 !important',
        }
    },
    deleteFeedbackButton: {
        backgroundColor: '#D73737 !important',
    },
    borderRadius: {
        borderRadius: '12px !important'
    },
    blueColor: {
        color: '#4661E6 !important'
    },
    darkBlueColor: {
        color: '#3A4374 !important'
    },
    lightBlueColor: {
        color: '#647196 !important'
    },
    purpleColor: {
        color: '#AD1FEA !important'
    },
    listItem: {
        borderBottom: '1px solid #979797d6',
        '&:last-child': {
            borderBottom: 'none !important'
        },
        '&:hover, &:hover .MuiTypography-root': {
            color: '#AD1FEA !important',
        }
    },
    listIcon: {
        color: '#AD1FEA !important',
        minWidth: '23px !important'
    },
    input: {
        backgroundColor: '#F7F8FD',
        borderRadius: 12,
        padding: '.8rem 1rem',
        '&:focus': {
            border: '1px solid #4661E6 !important'
        }
    },
}));