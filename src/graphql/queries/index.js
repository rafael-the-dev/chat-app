import { gql } from "@apollo/client"

export const GET_DIRECT_CHAT = gql`
    query GetDirectChat($id: String, $dest: String) {
        directChat(id: $id, dest: $dest) {
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

export const GET_DIRECTS_CHAT = gql`
    query GetDirectsChat {
        directChats {
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

export const GET_GROUP_CHAT = gql`
    query GetGroupChat($ID: String!) {
        group(ID: $ID) {
            ID
            admin
            createdAt
            description
            invitations {
                target
            }
            image
            name
            members
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

export const GET_GROUPS = gql`
    query GetGroups {
        groups {
            ID
            image
            invitations {
                createdAt
                ID
                sender
                target
            }
            name
            messages {
                createdAt
                ID
                isDeleted
                isRead {
                    isRead
                    username
                }
                text
            }
        }
    }
`;

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
            isOnline
            name
            username
        }
    }
`;

export const GET_LOGGED_USER_DETAILS = gql`
    query getLoggedUserDetails {
        loggedUser {
            directChats {
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
            friendships {
                image
                isOnline
                name
                username
            }
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
                target {
                    image
                    name
                    username
                }
            }
            groups {
                ID
                image
                invitations {
                    createdAt
                    ID
                    sender
                    target
                }
                name
                messages {
                    createdAt
                    ID
                    isDeleted
                    isRead {
                        isRead
                        username
                    }
                    text
                }
            }
            groupsInvitations {
                ID
                createdAt
                name
                groupID
                sender
            }
            image
            isOnline
            name
            username
        }
    }
`;

export const GET_POSTS = gql`
    query getPosts {
        posts {
            author
            createdAt
            comments {
                ID
                content
                createdAt
                replies {
                    ID
                    content 
                    createdAt
                    replyingTo
                    username
                }
                username
            }
            description
            ID
            image
            likes {
                username
            }
            tags
        }
    }
`;

export const GET_USER = gql`
    query getUser($username: String!) {
        user(username: $username) {
            groupsInvitations {
                ID
                createdAt
                name
                groupID
                sender
            }
            image
            isOnline
            name
            username
        }
    }
`;

export const GET_USERS = gql`
    query getUsers {
        users {
            image
            isOnline
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