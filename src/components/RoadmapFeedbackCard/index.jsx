import { Chip, Paper, Typography } from '@mui/material'
import classNames from 'classnames'
//import { useBackground, useDisplay, useGlobalStyles, useTypography } from 'src/styles'
import classes from './styles.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMemo } from 'react';

const FeedbackCard = ({ comments, category, description, status, title, upVotes }) => {
    //const bg = useBackground();
    //const classes = useStyles();
    //const display = useDisplay();
    //const globalStyles = useGlobalStyles();
    //const text = useTypography();

    const toggleButton = useMemo(() => (
        <button className={classNames("border-0 outline-none flex items-center rounded-2xl", classes.button)}>
            <KeyboardArrowDownIcon className={classNames("rotate-180", classes.buttonArrow)} />
            <span className={classNames("font-bold", classes.darkBlueColor, classes.buttonText)}>
                { upVotes }
            </span>
        </button>
    ), [ upVotes ]);

    const commentButton = useMemo(() => (
        <button className={classNames("bg-transparent border-0 font-bold flex items-center outline-none", 
            classes.commentButton, classes.darkBlueColor)}>
            { comments ? comments.length : 0 }
        </button>
    ), [ comments ]);

    const feedbackStatus = useMemo(() => ({
        'in-progress': classes.inProgressStatus,
        live: classes.liveStatus,
        planned: classes.plannedStatus
    }), [ ]);

    const feedbackTextStatus = useMemo(() => ({
        'in-progress': classes.roadmapStateTextInProgress,
        live: classes.roadmapStateTextLive,
        planned: classes.roadmapStateTextPlanned
    }), [ ]);

    return (
        <article component="article" xs={12} sm={6} md={12}>
            <Paper elevation={0} className={classNames(`box-border items-start justify-between mb-4 py-4 relative px-5`,
                classes.paper)}>
                <span className={classNames("block", classes.roadmapStateText, feedbackTextStatus[status])}>
                    { status.replace('-', ' ') }
                </span>
                <div className={classNames("grow", classes.content)}>
                    <Typography gutterBottom component="h3" variant="h6" className={classNames(classes.darkBlueColor)}>
                        { title }
                    </Typography>
                    <Typography gutterBottom className={classNames("text-sm", classes.description)}>
                        { description }
                    </Typography>
                    <Chip label={ category } className={classNames(classes.chip)} />
                </div>
                <div className={classNames("flex items-center justify-between mt-4")}>
                    { toggleButton }
                    { commentButton }
                </div>
                <span className={classNames("absolute block h-full w-full", classes.statusBar, feedbackStatus[status])}></span>
            </Paper>
        </article>
    );
};

export default FeedbackCard;