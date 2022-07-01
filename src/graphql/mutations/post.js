import { gql } from '@apollo/client';

export const ADD_POST = gql`
    mutation AddPost($post: PostInput!) {
        addPost(postInput: $post) {
            ID
            createdAt
        }
    }
`;