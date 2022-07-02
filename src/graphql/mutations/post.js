import { gql } from '@apollo/client';

export const ADD_POST = gql`
    mutation AddPost($post: PostInput!) {
        addPost(postInput: $post) {
            ID
            createdAt
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