import { useMemo } from "react"

import Container from "src/components/container"
import Friendships from 'src/components/Friendship'

import { FriendshipContextProvider } from 'src/context/FriendshipContext';

const FriendshipsContainer = () => {
    const friendshipsMemo = useMemo(() => <Friendships />, [])

    return (
        <FriendshipContextProvider>
            <Container>
                { friendshipsMemo }
            </Container>
        </FriendshipContextProvider>
    );
};

export default FriendshipsContainer;