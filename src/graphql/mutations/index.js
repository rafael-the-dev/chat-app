import { gql } from '@apollo/client'

export const ACCEPT_FRIENDSHIP_INVITATION = gql`
    mutation AcceptFriendshipInvitation($id: String!) {
        acceptFriendshipInvitation(id: $id) {
            ID
            status
        }
    }
`;

export const CREATE_NEW_USER = gql`
    mutation CreateUser($user: UserInput!) {
        registerUser(user: $user) {
            name
            username
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
            image
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

export const REJECT_FRIENDSHIP_INVITATION = gql`
    mutation RejectFriendshipInvitation($id: String!) {
        rejectFriendshipInvitation(id: $id) {
            ID
            status
        }
    }
`;

export const SEND_FRIENDSHIP_INVITATION = gql`
    mutation SendFriendshipInvitation($targetUsername: String!, $description: String) {
        sendFriendshipInvitation(targetUsername: $targetUsername, description: $description) {
            ID
            active
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
            image
            name
            username
        }
    }
`;
