import Avatar from "src/components/avatar"
import { useCallback, useContext, useRef } from "react"
import classNames from "classnames"
import { LoginContext } from "src/context";

import UserDetails from "src/components/chat/components/user-details"

const AvatarContainer = ({ destinatary, isDirectChat, sender }) => {
    const { loggedUser } = useContext(LoginContext);

    const clickHandler = useRef(null);

    const openPopover = useCallback(event => {
        event.stopPropagation();
        if(clickHandler.current && !Boolean(isDirectChat)) {
            clickHandler.current(event);
        }
    }, [ isDirectChat ]);

    return (
        <>
            <Avatar 
                className={classNames("mb-4 hover:cursor-pointer", { "hidden": loggedUser.username === sender })}
                onClick={openPopover}
                image={destinatary.image}
            />
            <UserDetails clickHandler={clickHandler} username={destinatary.username} />
        </>
    );
};

export default AvatarContainer;