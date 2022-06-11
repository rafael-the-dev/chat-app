import { gql } from '@apollo/client'

export const CREATE_NEW_USER = gql`
    mutation CreateUser($user: UserInput!) {
        registerUser(user: $user) {
            name
            username
        }
    }
`;