import { useCallback, useMemo, useRef, useState } from 'react'
import { Avatar, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';

const Image = ({ imageRef }) => {
    const avatarRef = useRef(null);
    //const [ file, setFile ] = useState(null);
    const fileRef = useRef(null);

    const changeHandler = useCallback(event => {
        const inputFile = event.target.files[0];
        //console.log(inputFile)
        if(inputFile) {
            if(avatarRef.current !== null) {
                const reader = new FileReader();
    
                avatarRef.current.title = inputFile.name;
    
                reader.onload = event => {
                    avatarRef.current.firstChild.src = event.target.result;
                    imageRef.current = inputFile;
                    //console.log(event.target.result)
                };
    
                reader.readAsDataURL(inputFile);
            }
        }
    }, []);

    const clickHandler = useCallback(() => {
        if(fileRef.current !== null) {
            fileRef.current.click()
        }
    }, []);
    //const emptyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3wFl3NBSAHtNdH-GHlT4dk1cLcHb4qhdHo4Lk0ntbc5XM2qqimy2QVjlUCeK_LiCI70&usqp=CAU"
    return (
        <div>
            <input className="hidden" ref={fileRef} type="file" onChange={changeHandler} />
            <div className="relative w-fit">
                <AccountCircleIcon className="text-9xl" />
                <IconButton className="absolute bottom-0 right-0" onClick={clickHandler}>
                    <AddIcon />
                </IconButton>
            </div>
            <Avatar 
                alt=""
                ref={avatarRef}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAt16FjI60ZX7mbnNiMTSiGiWXelr3NFehw&usqp=CAU"
            />
        </div>
    );
};

export default Image;