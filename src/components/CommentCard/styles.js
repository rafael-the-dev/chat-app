import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({
    gridItem: {
        '& .grid-item-container': {
            borderBottom: '1px solid #9797978c',
        },
        '&:last-child .grid-item-container': {
            borderBottom: 'none',
        }
    },
    arrowUp: {
        transform: 'rotate(180deg)'
    }
 }));