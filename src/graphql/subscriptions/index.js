import { gql } from '@apollo/client';

export const DIRECT_MESSAGE_SENT = gql`
    subscription MessageSent($users: [String!]!) {
        messageSent(users: $users) {
            ID
            datetime
            messages {
                createdAt
                ID
                isDeleted
                isForwarded
                image
                isRead
                reply {
                    createdAt
                    ID
                    image
                    sender
                    text
                }
                sender
                text
            }
        }
    }
`;

export const FRIENDSHIP_INVITATION_ACCEPTED = gql`
    subscription FriendshipInvitationAccepted($id: String!) {
        friendshipInvitationAccepted(id: $id) {
            ID
            receiver {
                image
                isOnline
                name
                username
            }
            status
            sender {
                image
                isOnline
                name
                username
            }
        }
    }
`;

export const GROUP_UPDATED = gql`
    subscription GroupUpdated($id: String!) {
        groupUpdated(id: $id) {
            ID
            admin
            createdAt
            description
            invitations {
                target
            }
            image
            name
            members
            messages {
                createdAt
                ID
                isDeleted
                isForwarded
                image
                isRead {
                    isRead
                    username
                }
                reply {
                    createdAt
                    ID
                    image
                    sender
                    text
                }
                sender
                text
            }
        }
    }
`;

export const USER_CREATED_SUBSCRIPTION = gql`
    subscription UserCreated {
        userCreated {
            image
            isOnline
            name
            username
        }
    }
`;

export const USER_UPDATED_SUBSCRIPTION = gql`
    subscription UserUpdated($username: String!) {
        userUpdated(username: $username) {
            groupsInvitations {
                ID
                createdAt
                name
                groupID
                sender
            }
            image
            isOnline
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
            target {
                image
                name
                username
            }
        }
    }
`;

export const NOTIFICATION_SUBSCRIPTION = gql`
    subscription Notification($username: String!) {
        notification(username: $username) {
            author
            checked
            createdAt
            commentId
            replyId
            type
            post {
                author
                createdAt
                comments {
                    ID
                    comment
                    createdAt
                    likes {
                        username
                    }
                    replies {
                        ID
                        comment 
                        createdAt
                        likes {
                            username
                        }
                        replyingTo
                        username
                    }
                    username
                }
                description
                ID
                image
                likes {
                    username
                }
                tags
            }
        }
    }
`;

export const POST_ADDED_SUBSCRIPTION = gql`
    subscription PostAdded {
        postAdded {
            author
            createdAt
            comments {
                ID
                comment
                createdAt
                likes {
                    username
                }
                replies {
                    ID
                    comment 
                    createdAt
                    likes {
                        username
                    }
                    replyingTo
                    username
                }
                username
            }
            description
            ID
            image
            likes {
                username
            }
            tags
        }
    }
`;

export const POST_UPDATED_SUBSCRIPTION = gql`
    subscription PostUpdated {
        postUpdated {
            operation
            post {
                author
                createdAt
                comments {
                    ID
                    comment
                    createdAt
                    likes {
                       username
                    }
                    replies {
                        ID
                        comment 
                        createdAt
                        likes {
                            username
                        }
                        replyingTo
                        username
                    }
                    username
                }
                description
                ID
                image
                likes {
                    username
                }
                tags
            }
        }
    }
`;

export const UPDATED_POST_SUBSCRIPTION = gql`
    subscription UpdatedPost($id: String!) {
        updatedPost(id: $id) {
            author
            createdAt
            comments {
                ID
                comment
                createdAt
                likes {
                    username
                }
                replies {
                    ID
                    comment 
                    createdAt
                    likes {
                        username
                    }
                    replyingTo
                    username
                }
                username
            }
            description
            ID
            image
            likes {
                username
            }
            tags
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