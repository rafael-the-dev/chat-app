import { gql } from '@apollo/client'

export const ACCEPT_FRIENDSHIP_INVITATION = gql`
    mutation AcceptFriendshipInvitation($id: String!) {
        acceptFriendshipInvitation(id: $id) {
            ID
            status
        }
    }
`;

export const ACCEPT_GROUP_INVITATION = gql`
    mutation AcceptGroupInvitation($groupID: String!, $ID: String!) {
        acceptGroupInvitation(groupID: $groupID, ID: $ID)
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

export const CREATE_NEW_GROUP = gql`
    mutation CreateGroup($group: GroupInput!) {
        createGroup(group: $group) {
            ID
        }
    }
`;

export const DELETE_DIRECT_MESSAGE = gql`
    mutation DeleteDirectMessage($chatID: String!, $destinatary: String!, $messageID: String) {
        deleteDirectMessage(chatID: $chatID, destinatary: $destinatary, messageID: $messageID) {
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

export const DELETE_GROUP_MESSAGE = gql`
    mutation DeleteGroupMessage($groupID: String!, $messageID: String) {
        deleteGroupMessage(groupID: $groupID, messageID: $messageID) {
            ID
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

export const READ_DIRECT_MESSAGE = gql`
    mutation ReadMessage($chatID: String!) {
        readMessage(chatID: $chatID) {
            ID
        }
    }
`;

export const READ_GROUP_MESSAGE = gql`
    mutation ReadGroupMessage($chatID: String!) {
        readGroupMessage(chatID: $chatID) {
            ID
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

export const REJECT_GROUP_INVITATION = gql`
    mutation RejectGroupInvitation($groupID: String!, $ID: String!) {
        rejectGroupInvitation(groupID: $groupID, ID: $ID)
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

export const SEND_DIRECT_MESSAGE = gql`
    mutation SendDirectMessage($messageInput: DirectMessageInput!) {
        sendDirectMessage(messageInput: $messageInput) {
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

export const SEND_GROUP_MESSAGE = gql`
    mutation SendGroupMessage($messageInput: GroupMessageInput!) {
        sendGroupMessage(messageInput: $messageInput) {
            ID
            createdAt
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

export const SEND_GROUP_INVITATION = gql`
    mutation SendGroupInvitation($groupInvitation: GroupInvitationInput!) {
        sendGroupInvitation(invitation: $groupInvitation)
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
