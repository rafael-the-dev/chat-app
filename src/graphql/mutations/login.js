import { gql } from '@apollo/client';

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

export const LOGOUT = gql`
    mutation Logout {
        logout
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
            image
            name
            username
        }
    }
`;