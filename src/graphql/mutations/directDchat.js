import { gql } from '@apollo/client';

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

export const READ_DIRECT_MESSAGE = gql`
    mutation ReadMessage($chatID: String!) {
        readMessage(chatID: $chatID) {
            ID
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
            users
        }
    }
`;