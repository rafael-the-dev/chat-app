import { Button } from "@mui/material"
import { useContext, useMemo, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';

import { AppContext } from "src/context";

const SendButton = ({ username, value }) => {
    const { getFriendshipsList } = useContext(AppContext);

    const [ isLoading, setIsLoading ] = useState(false);

    const isMyFriend = useMemo(() => {
        const result = getFriendshipsList().find(user => user.username === username);
        return Boolean(result);
    }, [ getFriendshipsList, username ]);

    const canISubmit = useMemo(() => {
        if(isMyFriend) {
            return !Boolean(value.trim());
        }

        return true;
    }, [ isMyFriend, value ])

    return (
        <Button
            className="mt-3"
            disabled={canISubmit}
            variant="contained">
            { isLoading ? <CircularProgress className="text-slate-100" size={25} /> : "Send" }
        </Button>
    );
};

export default SendButton;