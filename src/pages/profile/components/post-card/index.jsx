import Image from "src/components/image"
import classes from "./styles.module.css"

const Container = ({ comments, ID, image, likes }) => {

    if(ID === "none") return <li className={classes.root}></li>;
    
    return (
        <li className={classes.root}>
            <Image url={image} />
        </li>
    );
};

export default Container;