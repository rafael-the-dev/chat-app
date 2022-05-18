import { Chip, Grid, Hidden, Paper, Typography } from '@mui/material'
import classNames from 'classnames'
import classes from './styles.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCallback, useContext, useMemo } from 'react';

import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client';
import { UPVOTE_FEEDBACK } from 'src/graphql/mutations';
import { GET_FEEDBACK, GET_FEEDBACKS } from 'src/graphql/queries';
import { AppContext } from 'src/context/AppContext';

const FeedbackCard = ({ comments, category, description, ID, title, upVotes, isClickable }) => {
   // const classes = useStyles();

    const router = useRouter();
    const { errorHandler, startLoading, stopLoading } = useContext(AppContext)
    
    const mutation = useMutation(UPVOTE_FEEDBACK, { 
        refetchQueries: router.pathname === "/" ? [ GET_FEEDBACKS ] : [ GET_FEEDBACK] 
    })
    
    const editClickHandler = useCallback(() => {
        const addUpVote = mutation[0];
        startLoading();

        addUpVote({ 
            variables: { id: ID } ,
            onCompleted() { stopLoading() },
            onError(err) { errorHandler(err); stopLoading() }
        });
    }, [ errorHandler, ID, mutation, startLoading, stopLoading ]);

    const toggleButton = useMemo(() => (
        <button 
            className={classNames("border-0 flex items-center outline-none sm:flex-col", classes.button)}
            id="increase-upvotes"
            onClick={editClickHandler}>
            <KeyboardArrowDownIcon id="increase-upvotes-icon" className={classNames('rotate-180', classes.buttonArrow)} />
            <span id="increase-upvotes-text" className={classNames("font-bold", classes.darkBlueColor, classes.buttonText)}>
                { upVotes }
            </span>
        </button>
    ), [ editClickHandler, upVotes ]);

    const commentButton = useMemo(() => (
        <button className={classNames("border-0 bg-transparent flex font-bold items-center outline-none", classes.commentButton,
            classes.darkBlueColor)}>
            { comments ? comments.length : 0 }
        </button>
    ), [ comments ]);

    const titleMemo = useMemo(() => (
        <Typography gutterBottom component="h2" variant="h6" className={classNames(classes.darkBlueColor)}>
            { title }
        </Typography>
    ), [ title ]);

    const descriptionMemo = useMemo(() => (
        <Typography gutterBottom className={classNames("text-sm", classes.description)}>
            { description }
        </Typography>
    ), [ description ]);

    const chipMemo = useMemo(() => <Chip label={ category } className={classNames(classes.chip)} />, [ category ])
    
    //const navigate = useNavigate();
    const clickHandler = useCallback(event => {
        if(!['increase-upvotes', 'increase-upvotes-icon', 'increase-upvotes-text'].includes(event.target.id)) {
            if(clickHandler) {
                router.push(`/feedbacks/${ID}`)
            }
        }
    }, [ ID, router ]);

    return (
        <Grid component="article" item xs={12}>
            <Paper 
                elevation={0} 
                onClick={clickHandler}
                className={classNames("justify-between items-start mb-4 px-5 py-4 sm:flex", classes.paper,
                { [classes.clickablePaper]: isClickable })}>
                <Hidden smDown>
                    { toggleButton }
                </Hidden>
                <div className={classNames("grow sm:mx-4 md:ml-8", classes.content)}>
                    { titleMemo }
                    { descriptionMemo }
                    { chipMemo }
                </div>
                <Hidden smUp>
                    <div className={classNames("flex items-center justify-between mt-4")}>
                        { toggleButton }
                        { commentButton }
                    </div>
                </Hidden>
                <Hidden smDown>
                    { commentButton }
                </Hidden>
            </Paper>
        </Grid>
    );
};

export default FeedbackCard;