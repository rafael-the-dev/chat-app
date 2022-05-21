import { gql } from '@apollo/client';

export const USER_CREATED_SUBSCRIPTION = gql`
    subscription UserCreated {
        userCreated {
            image
            name
            username
        }
    }
`;

export const FRIENDSHIP_INVITATION_SENT = gql`
    subscription FriendshipInvitationSent($id: String!) {
        friendshipInvitationSent(id: $id) {
            ID
            active
            description
            datetime
            sender {
                image
                name
                username
            }
        }
    }
`;

export const GET_FEEDBACKS__SUBSCRIPTION = gql`
    subscription PostCreated {
        feedbackCreated {
            ID
            category
            comments {
                ID
                content
                replies {
                    replyingTo
                }
            }
            description
            status
            title
            upVotes
        }
    }
`;

export const GET_FEEDBACK__SUBSCRIPTION = gql`
    subscription FeedbackUpdated($id: String!) {
        feedbackUpdated(id: $id) {
            ID
            category
            comments {
                ID
                content
                replies {
                    content 
                    replyingTo
                    user {
                        name
                        username
                    }
                }
                user {
                    name
                    username
                }
            }
            description
            status
            title
            upVotes
            user {
                name
                username
            }
        }
    }
`; //

export const DELETE_FEEDBACK_SUBSCRIPTION = gql`
    subscription DeleteFeedback {
        feedbackDeleted {
            ID
            status
        }
    }
`;
/**
 * ID
            category
            comments {}
            
            description
            status
            title
            upVotes
 * subscription {
        feedbacks {
            ID
            category
            comments {
                ID
                content
                replies {
                    replyingTo
                }
            }
            description
            status
            title
            upVotes
        }
    }
 */