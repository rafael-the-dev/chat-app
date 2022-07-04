
export const getUserDetails = ({ list, username }) => {
    const result = list.find(user => user.username === username);

    if(result) return result;

    return { image: "", name: "", username: "" }
};

export const hasLiked = ({ likes, username }) => {
    const result = likes.find(like => like.username === username);
    return Boolean(result)
};