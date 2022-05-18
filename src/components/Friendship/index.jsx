import { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import FriendCard from "./components/user-card"

const Container = () => {
    const { getUsersList } = useContext(AppContext);

    console.log(getUsersList())
    return (
        <main>
            <div className="px-5 pt-6">
                {
                    getUsersList()?.map((item, index) => <FriendCard key={index} { ...item } />)
                }
            </div>
        </main>
    );
};

export default Container;