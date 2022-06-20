import { gql } from '@apollo/client';

export const ACCEPT_FRIENDSHIP_INVITATION = gql`
    mutation AcceptFriendshipInvitation($id: String!) {
        acceptFriendshipInvitation(id: $id) {
            ID
            status
        }
    }
`;

export const DELETE_FRIENDSHIP = gql`
    mutation DeleteFriendship($username: String!) {
        deleteFriendship(username: $username)
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