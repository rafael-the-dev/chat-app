import { useContext } from "react";
import { AppContext } from "src/context/AppContext";

const Container = () => {
    const { getUsersList } = useContext(AppContext);

    console.log(getUsersList())
    return (
        <></>
    );
};

export default Container;