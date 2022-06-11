import { gql } from '@apollo/client';

export const ACCEPT_GROUP_INVITATION = gql`
    mutation AcceptGroupInvitation($groupID: String!, $ID: String!) {
        acceptGroupInvitation(groupID: $groupID, ID: $ID)
    }
`;

export const CREATE_NEW_GROUP = gql`
    mutation CreateGroup($group: GroupInput!) {
        createGroup(group: $group) {
            ID
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

export const REJECT_GROUP_INVITATION = gql`
    mutation RejectGroupInvitation($groupID: String!, $ID: String!) {
        rejectGroupInvitation(groupID: $groupID, ID: $ID)
    }
`;

export const READ_GROUP_MESSAGE = gql`
    mutation ReadGroupMessage($chatID: String!) {
        readGroupMessage(chatID: $chatID) {
            ID
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