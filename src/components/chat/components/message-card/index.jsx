import { Avatar, Typography } from '@mui/material'
import { useContext } from 'react';
import { AppContext } from 'src/context/AppContext';
import { LoginContext } from 'src/context/LoginContext';

const Container = () => {
    const { user } = useContext(LoginContext)
    const { getInitialsNameLetters} = useContext(AppContext);

    return (
        <article className="flex">
            <Avatar className="bg-cyan-500">{ getInitialsNameLetters(user ? user.name : "" )}</Avatar>
            <div className="grow ml-3">
                <div>
                    <Typography>Hello How are you? I miss you so much.</Typography>
                    <span></span>
                </div>
            </div>
        </article>
    );
};

export default Container;