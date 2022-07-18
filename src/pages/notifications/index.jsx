import { useContext } from "react"

import { AppContext } from "src/context"

import Container from "src/components/container"
import Card from "./components/post-card"

const Notifications = () => {
    const { getNotifications } = useContext(AppContext);
    console.log(getNotifications())
    return (
        <Container>
            <ul className="px-4 pt-6 mb-6">
                {
                    getNotifications().map((item, index) => <Card key={index} { ...item} />)
                }
            </ul>
        </Container>
    );
};

export default Notifications;