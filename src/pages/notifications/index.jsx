import { useContext } from "react"

import { AppContext } from "src/context"

import Container from "src/components/container"
import List from "./components/list"

const Notifications = () => {
    const { getNotifications } = useContext(AppContext);
    console.log(getNotifications())
    return (
        <Container>
            <List />
        </Container>
    );
};

export default Notifications;