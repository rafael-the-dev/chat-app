import { useCallback, useMemo, useRef, useState } from 'react'
import { Avatar, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames';

const Image = ({ imageRef }) => {
    const avatarRef = useRef(null);
    const [ file, setFile ] = useState(null);
    const fileRef = useRef(null);

    const changeHandler = useCallback(event => {
        const inputFile = event.target.files[0];
        //console.log(inputFile)
        if(inputFile) {
           // console.log(avatarRef.current)
            if(avatarRef.current !== null) {
                const reader = new FileReader();
                //console.log(inputFile)
    
                avatarRef.current.firstChild.alt = inputFile.name;
    
                reader.onload = event => {
                    avatarRef.current.firstChild.src = event.target.result;
                    imageRef.current = inputFile;
                    //console.log(event.target.result)
                };
    
                reader.readAsDataURL(inputFile);
                setFile(inputFile)
            }
        }
    }, [ imageRef ]);
    //console.log(file)
    const emptyImage = useRef("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAt16FjI60ZX7mbnNiMTSiGiWXelr3NFehw&usqp=CAU");

    const clickHandler = useCallback(() => {
        
        if(fileRef.current !== null) {
            if(imageRef.current === null) { 
                fileRef.current.click()
            } else {
                imageRef.current = null;
                setFile(null)
                avatarRef.current.firstChild.src = emptyImage.current;
            }
        }
    }, [ imageRef ]);

    return (
        <div className="flex items-center justify-center">
            <input className="hidden" ref={fileRef} type="file" onChange={changeHandler} />
            <div className="relative w-fit">
                <Avatar 
                    alt=""
                    className={classNames("h-[100px] w-[100px]", { 'hidden': !Boolean(file) })}
                    ref={avatarRef}
                    src={emptyImage.current}
                /> 
                <AccountCircleIcon className={classNames("text-8xl dark:text-slate-400", { 'hidden': Boolean(file) })} />
                <IconButton 
                    className={classNames("absolute p-[2px] text-base text-slate-100", Boolean(file) ? 'bg-red-500 right-[-2px] bottom-[-2px] hover:bg-red-300' : "bg-cyan-600 bottom-[4px] right-[4px] hover:bg-cyan-500" )} 
                    onClick={clickHandler}>
                    { file ? <CloseIcon /> : <AddIcon /> }
                </IconButton>
            </div>
        </div>
    );
};

export default Image;