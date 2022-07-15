import classNames from "classnames"
import classes from "./styles.module.css"

const Container = ({ className }) => {
    return (
        <div className={classNames(className, classes.container)}>
            <div className={classNames(classes.item)}></div>
            <div className={classNames(classes.item)}></div>
            <div className={classNames(classes.item)}></div>
            <div className={classNames(classes.item)}></div>
            <div className={classNames(classes.item)}></div>
        </div>
    );
};

export default Container;