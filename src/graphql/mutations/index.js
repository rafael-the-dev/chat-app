import { gql } from '@apollo/client'

export const ADD_COMMENT = gql`
    mutation createComment($comment: CommentInput!) {
        addComment(comment: $comment) {
            ID
        }
    }
`;

export const ADD_FEEDBACK = gql`
    mutation createFeedback($feedback: FeedbackInput!) {
        addFeedback(feedback: $feedback) {
            ID
        }
    }
`;

export const CREATE_NEW_USER = gql`
    mutation createUser($user: RegisteredUserInput!) {
        registerUser(user: $user) {
            name
            username
        }
    }
`;

export const ADD_REPLY = gql`
    mutation createReply($reply: CommentReplyInput!) {
        addCommentReply(reply: $reply) {
            ID
        }
    }
`;

export const DELETE_FEEDBACK = gql`
    mutation DeleteFeedback($id: String!) {
        deleteFeedback(id: $id) {
            ID
            status
        }
    }
`;

export const EDIT_FEEDBACK = gql`
    mutation EditFeedback($id: String!, $feedback: FeedbackInput!) {
        editFeedback(id: $id, feedback: $feedback) {
            ID
            description
            title
        }
    }
`;

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            acessToken {
                expiresIn
                token
            }
            name
            username
        }
    }
`;

export const REVALIDATE_TOKEN = gql`
    mutation RevalidateToken {
        revalidateToken {
            expiresIn
            token
        }
    }
`;

export const VALIDATE_TOKEN = gql`
    mutation ValidateToken($token: String!) {
        validateToken(token: $token) {
            acessToken {
                expiresIn
                token
            }
            name
            username
        }
    }
`;

export const UPVOTE_FEEDBACK = gql`
    mutation UpVoteFeedback($id: String!) {
        upVoteFeedback(id: $id) {
            ID
        }
    }
`;