import { useContext } from 'react'
import classNames from "classnames"

import { ChatContext } from "src/context"

const GroupChat = () => {
    const { chatTab } = useContext(ChatContext);

    return (
        <div className={classNames({ "hidden": chatTab !== "GROUP_CHAT"})}>
            Hello
        </div>
    );
};

export default GroupChat;