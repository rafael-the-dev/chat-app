import classNames from 'classnames';
import globalStyles from 'src/styles/global-styles.module.css';
import classes from './styles.module.css'
import { Avatar, Button, Collapse, Grid, Hidden, IconButton, Typography } from '@mui/material';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { AppContext } from 'src/context/AppContext';
//import { replayComment } from 'src/redux/actions'
//import { useDispatch } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import { useMutation } from "@apollo/client"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ADD_REPLY } from "src/graphql/mutations";
import { GET_FEEDBACK, GET_FEEDBACKS } from "src/graphql/queries";
//import { LoginContext } from 'src/context/LoginContext';

const CommentCard = ({ commentID, content, isMainCommentCard, replies, replyingTo, user,  feedbackID, setOpenOpenCommentSnackbar }) => {
    //const globalStyles = useGlobalStyles();
    const addCommentReply = useMutation(ADD_REPLY, {
        refetchQueries: [ GET_FEEDBACK, GET_FEEDBACKS ]
    });

    //const loginContext = useContext(LoginContext);
    //const loggedUser = loginContext.user;
    const { errorHandler, getInitialsNameLetters, startLoading, stopLoading } = useContext(AppContext)

    const [ openCommetsCollapse, setOpenCommentsCollapse ] = useState(false);
    const [ openCollapse, setOpenCollapse ] = useState(false);
    const [ comment, setComment ] = useState('');
    const commentRef = useRef('');
    const isSuccefulReply = useRef(false);

    const setIsSuccefulReply = useCallback(prop => isSuccefulReply.current = prop, []);
    const hasReplies = useMemo(() => {
        if(replies) {
            return replies.length > 0;
        }
        return false;
    }, [ replies ]);

    const totalCommetLenght = useRef(225);
    const changeHandler = useCallback(event => {
        const value = event.target.value; 
        if(totalCommetLenght.current + 1 > value.length) {
            commentRef.current = value;
            setComment(value)
        }
    }, []);

    const submitHandler = useCallback(event => {
        event.preventDefault();
        startLoading();
        const replyComment = addCommentReply[0];

        replyComment({
            variables: {
                reply: {
                    content: commentRef.current,
                    commentID,
                    feedbackID,
                    replyingTo: user.username
                }
            },
            onCompleted() {
                setOpenCollapse(false)
                setComment('');
                setOpenOpenCommentSnackbar(true);
                setIsSuccefulReply(false);
                stopLoading();
            },
            onError(err) {
                errorHandler(err);
                stopLoading();
                //console.log(err)
            }
        });

    }, [ addCommentReply, commentID, errorHandler, feedbackID, setIsSuccefulReply, 
        setOpenOpenCommentSnackbar, user, startLoading, stopLoading ]);

    return (
        <Grid item xs={12} component="article" className={classNames({ 'comment-grid-item': isMainCommentCard })}>
            <div className={classNames("pb-4 mb-4", classes.container, { 'comment-grid-item__wrapper': isMainCommentCard},
                'items-start sm:flex md:mb-8')}>
                <Hidden smDown>
                    <Avatar 
                        src={'/images/user-images/' + user.image}
                        alt={user.name}
                        className="uppercase"
                    >{ getInitialsNameLetters(user.name) }</Avatar>
                </Hidden>
                <div className={classNames('grow sm:ml-8')}>
                   <div className={classNames('flex', 'justify-between', 'items-center')}>
                        <div className={classNames('flex', 'justify-between', 'items-center')}>
                            <Hidden smUp>
                                <Avatar 
                                    src={'/images/user-images/' + user.image}
                                    alt={user.name}
                                />
                            </Hidden>
                            <div className={classNames("ml-4 sm:ml-0")}>
                                <Typography 
                                    component="h3" 
                                    className={classNames("font-bold", globalStyles.darkBlueColor)}>
                                        { user.name }
                                </Typography>
                                <Typography 
                                    component="p" 
                                    className={classNames("text-sm", globalStyles.lightBlueColor)}>
                                        @{ user.username }
                                </Typography>
                            </div>
                        </div>
                        <Button 
                            className={classNames("capitalize font-bold", globalStyles.blueColor)}
                            onClick={() => setOpenCollapse(b => !b)}>
                            { openCollapse ? 'cancel' : 'Reply' }
                        </Button>
                   </div>
                   <Typography 
                        component="p" 
                        className={classNames("mt-4 text-sm", globalStyles.lightBlueColor)}>
                        { replyingTo ? <span className={classNames("font-bold", globalStyles.purpleColor)}>@{ replyingTo }</span> : ''} { content }
                    </Typography>
                    <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                       <form 
                            className={classNames('flex items-start mt-4')}
                            onSubmit={submitHandler}>
                            <textarea 
                                className={classNames('border-none outline-none grow', globalStyles.input,
                                    'box-border', globalStyles.darkBlueColor)} 
                                id="feedback-comment"
                                onChange={changeHandler}
                                value={comment}
                                rows={2}
                            ></textarea>
                            <Hidden smUp>
                                <IconButton 
                                    className={classNames(`ml-4`, globalStyles.addFeedbackButton)}
                                    type="submit">
                                    <SendIcon 
                                        className={classNames("text-white")}
                                    />
                                </IconButton>
                            </Hidden>
                            <Hidden smDown>
                                <Button 
                                    disabled={Boolean(!comment.trim())}
                                    variant="contained"
                                    type="submit"
                                    className={classNames("capitalize ml-4", globalStyles.addFeedbackButton, 
                                        globalStyles.button)}>
                                    Post reply
                                </Button>
                            </Hidden>
                       </form>
                    </Collapse>
                    { hasReplies && (
                        <>
                            <div className={classNames("flex justify-end")}>
                                <IconButton onClick={() => setOpenCommentsCollapse(o => !o)}>
                                    { openCommetsCollapse ? <KeyboardArrowDownIcon classes={{ root: classes.arrowUp}} /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </div>
                            <Collapse  in={openCommetsCollapse} timeout="auto" unmountOnExit>
                                <Grid container className={classNames("pl-8 pt-8")}>
                                    {
                                        replies.map((item, index) => (
                                            <CommentCard key={index} { ...item } commentID={commentID} feedbackID={feedbackID} setOpenOpenCommentSnackbar={setOpenOpenCommentSnackbar} />
                                        ))
                                    }
                                </Grid>
                            </Collapse>
                        </>
                    )
                    }
                </div>
            </div>
        </Grid>
    );
};

export default CommentCard;