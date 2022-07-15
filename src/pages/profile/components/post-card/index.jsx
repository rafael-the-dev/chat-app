import Image from "src/components/image"
import classes from "./styles.module.css"
import classNames from "classnames"
import { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FavoriteIcon from '@mui/icons-material/Favorite';

const Container = ({ comments, ID, image, likes }) => {
    const [ hover, setHover ] = useState(false);
    
    if(ID === "none") return <li className={classes.root}></li>;
    
    return (
        <li 
            className={classNames("relative", classes.root)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <Image url={image} />
            <ul 
                className={classNames(`absolute flex items-center justify-center text-white`, 
                classes.iterations, { [classes.iterationsShow ]: hover })}>
                <li className="flex items-center text-center">
                    <FavoriteIcon 
                        className={classNames("text-2xl")} 
                    />
                    <span className="font-bold ml-2 text-xl">{ likes.length }</span>
                </li>
                <li className="flex items-center ml-4 text-center">
                    <FontAwesomeIcon 
                        className={classNames("text-2xl")} 
                        icon="fa-solid comment fa-comment" 
                    />
                    <span className="font-bold ml-2 text-xl">{ comments.length }</span>
                </li>
            </ul>
        </li>
    );
};

export default Container;