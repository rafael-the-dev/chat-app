import classNames from "classnames";
import { forwardRef } from 'react'
import classes from './styles.module.css'

const Input = forwardRef(({ className, onChange, placeholder, required, type, value }, ref) => {
    return (
        <input 
            className={classNames(`border-0 bg-transparent outline-none px-2 text-sm`, classes.input, className)}
            placeholder={placeholder}
            ref={ref}
            required={required}
            type={type ? type : "text"}
            value={value}
            onChange={onChange}
        />
    );
});

export default Input;