import classNames from "classnames"
import classes from "./styles.module.css"

const Container = () => {
    return (
        <div className={classNames(classes.container)}>
            <div className={classNames(classes.item)}></div>
            <div className={classNames(classes.item)}></div>
            <div className={classNames(classes.item)}></div>
            <div className={classNames(classes.item)}></div>
            <div className={classNames(classes.item)}></div>
        </div>
    );
};

export default Container;