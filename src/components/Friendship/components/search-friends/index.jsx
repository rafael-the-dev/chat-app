import { useContext } from 'react'
import classNames from 'classnames';
//import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from "src/context/AppContext";

import FriendCard from "../user-card";

const Container = ({ className }) => {
    const { getUsersList } = useContext(AppContext)

    return (
        <div className={classNames(className)}>
            <div className="px-5 pt-6">
                {
                    getUsersList()?.map((item, index) => <FriendCard key={index} { ...item } />)
                }
            </div>
        </div>
    );
};

export default Container;