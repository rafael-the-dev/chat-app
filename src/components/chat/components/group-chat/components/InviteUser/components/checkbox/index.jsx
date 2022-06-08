import { Avatar, Checkbox, Typography } from "@mui/material"
import classNames from 'classnames'
import { useCallback, useEffect, useRef } from "react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const UserCheckbox = ({ image, list, name, setList, username }) => {
    const checkedRef = useRef(false);
    const checkboxRef = useRef(null);

    const onChangeHandler = useCallback(event => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        
        setList(oldList => {
            if(oldList.length < 3 && isChecked) {
                if(!oldList.includes(value)) {
                    //setChecked(true);
                    checkedRef.current = true;
                    return [ ...oldList, value ];
                }
            } 
            
            if(!isChecked) {
                //setChecked(false);
                checkedRef.current = false;
                return [ ...oldList.filter(item => item !== value) ];
            }

        })
    }, [ setList ]);

    return (
        <label 
            className={classNames("flex items-center w-full")} 
            htmlFor={`${username}-checkbox`}>
            <Avatar 
                className="h-[25px] text-base w-[25px]"
                src={image ? `http://localhost:5000/${image}` : ""}>
            </Avatar>
            <Typography 
                className={classNames("font-semibold grow ml-3 max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap")} 
                component="span">
                { name }
            </Typography>
            <Checkbox 
                disabled={list.length >= 3 && !checkedRef.current}
                id={`${username}-checkbox`}
                inputRef={checkboxRef}
                value={username}
                { ...label } 
                onChange={onChangeHandler}
            />
        </label>
    );
};

export default UserCheckbox;