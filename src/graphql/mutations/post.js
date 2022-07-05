import { gql } from '@apollo/client';

export const ADD_POST = gql`
    mutation AddPost($post: PostInput!) {
        addPost(postInput: $post) {
            ID
            createdAt
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation AddComment($comment: String!, $id: String!) {
        addComment(comment: $comment, id: $id) {
            ID
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: String!) {
        deletePost(id: $id) {
            operation
            post {
                ID
            }
        }
    }
`;

export const DISLIKE_COMMENT = gql`
    mutation DisikeComment($commentID: String!, $id: String!) {
        dislikeComment(commentID: $commentID, id: $id) {
            ID
        }
    }
`;

export const DISLIKE_POST = gql`
    mutation DislikePost($id: String!) {
        dislikePost(id: $id) {
            ID
        }
    }
`;

export const LIKE_COMMENT = gql`
    mutation LikeComment($commentID: String!, $id: String!) {
        likeComment(commentID: $commentID, id: $id) {
            ID
        }
    }
`;

export const LIKE_POST = gql`
    mutation LikePost($id: String!) {
        likePost(id: $id) {
            ID
        }
    }
`;

export const REPLY_COMMENT = gql`
    mutation ReplyComment($comment: String!, $commentID: String!, $id: String!, $replyingTo: String!) {
        addCommentReply(comment: $comment, commentID: $commentID, id: $id, replyingTo: $replyingTo) {
            ID
        }
    }
`;

