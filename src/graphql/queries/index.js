import { gql } from "@apollo/client"

export const GET_FRIENDSHIPS_INVITATIONS = gql`
    query getFriendshipsInvitations {
        friendshipInvitations {
            ID
            active
            description
            datetime
            sender {
                image
                name
                username
            }
        }
    }
`;

export const GET_FRIENDSHIPS = gql`
    query getFriendships {
        friendships {
            image
            name
            username
        }
    }
`;

export const GET_USERS = gql`
    query getUsers {
        users {
            image
            name
            username
        }
    }
`;

export const GET_FEEDBACKS = gql`
    query getFeedbacks {
        feedbacks {
            ID
            category
            comments {
                ID
                content
                replies {
                    replyingTo
                }
            }
            description
            status
            title
            upVotes
            user {
                name
                username
            }
        }
    }
`;

export const GET_FEEDBACK = gql`
    query getFeedback($id: String!) {
        feedback(id: $id) {
            ID
            category
            comments {
                ID
                content
                replies {
                    content 
                    replyingTo
                    user {
                        name
                        username
                    }
                }
                user {
                    name
                    username
                }
            }
            description
            status
            title
            upVotes
            user {
                name
                username
            }
        }
    }
`;