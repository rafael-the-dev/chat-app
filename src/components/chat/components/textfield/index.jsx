import { Collapse, IconButton } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Typography } from "@mui/material"
import classNames from "classnames"
//import Picker from 'emoji-picker-react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PhotoIcon from '@mui/icons-material/Photo';
import SendIcon from '@mui/icons-material/Send';

import { ChatContext } from "src/context";
import RepliedMessage from "./components/replied-message"

import dynamic from "next/dynamic";
const NoSSREmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const TextfieldContainer = ({ sendHandler }) => {
    const router = useRouter();
    const { page } = router.query;
    
    const { repliedMessage } = useContext(ChatContext);

    const [ expanded, setExpanded ] = useState(false);
    const [ file, setFile ] = useState({ image: null, url: "" });
    const [ canISubmit, setCanISubmit ] = useState(false);
    const [ openEmojis, setOpenEmojis ] = useState(false);

    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const imageRef = useRef(null);

    const deleteImage = useCallback(() => {
        setFile({ image: null, url: "" });
    }, []);

    const changeHandler = useCallback(event => {
        const value = event.target.value;

        setCanISubmit(Boolean(value));
    }, []);

    const imageButtonClickHandler = useCallback(() => {
        if(fileRef.current !== null) { 
            fileRef.current.click();
            setExpanded(false)
        }
    }, [ ]);

    const fileChangeHandler = useCallback(event => {
        const inputFile = event.target.files[0];

        if(inputFile) {
           const reader = new FileReader();

            reader.onload = event => { 
                imageRef.current = inputFile;
               setFile({ image: inputFile, url: event.target.result })
            };

           reader.readAsDataURL(inputFile);
        }
    }, [ imageRef ]);

    const toggleExpanded = useCallback(() =>  setExpanded(b => !b), []);

    const repliedMessageMemo = useMemo(() => <RepliedMessage />, []);
    const emptyImage = useRef(`data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQWFRgVFRYZGBgZGBgYGBoZGhwaGBoaGBwcGRgcGhwcJC4lHB4rHxwcJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMDw8PEA8REDEdGB0/ND8xMTE0MTE0PzQxNDE0MTQxMTExNDExPzExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAAAQIDBAUGB//EADgQAAEDAQUECQMDBAMBAAAAAAEAAhEhAxIxQVEEInGRExQyYYGhscHRUmLxcuHwBRUjQjOSooL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9fXFaYnifVPpDqea6mMEAkDAZLSFs/ZHj6lYbSZPh7lK2eQSAYHdhgtdnEiomudchqgWx5+Hur2zsjj7FRtNIimOFNNFOzGTBrTOumqgnZu0PH0K67Xsu4H0WduwBpIABpUUOK52PJIBJxGfegyK9VR0bfpHILz+kd9TuZQK27TuJ9V37L2B4+pUWdmIBgEwCZHNc9u4hxAJApQGBgge3dofpHqVf9P8A9vD3VbK0OaSRJmJNTgNVO2bsXd2ZmKThogvb+yP1D0K5tj7Y8fQrTZTecQ7eETBqMRqttpYA0kAAiIIEHEZhFa2/Yd+k+i8crezeS4AuJBIBBJgiV6PQs+lvIINV4lsZc4/c71Krpn/U7mV6NjZNLQS0SQCZAJrqoDYew3x9SuT+pdofpHqVO1PLXENJApABgYA4Bb7C0OaS4XjMS6piBSqBf0v/AG/+fdX/AFPsD9Q9Cs9u3bt3dmZu0mIiYWexEucQ43hdJh1RMitUGewdtvj6FentPYd+l3oVjtdm1rCQA0iIIEEVAxC8+ytHFzQXOIJAIkkEE1kIMCvo1z9Xb9Lf+oXji3f9bv8AsUH0CF8/07/rd/2KEHrdE3TzK532xBIBoKeCo2x7lTbEGpzrzWkOzsw4SanxyU2ji0w2gx1r4odaFu6MBrzVNbfqeFOfugVlvzerERljw4J2rQ0S2hmNfVJ+5hnr3flDHX6HjTl7qCbO0LiGuMg4+Fcls+xaASBUAkVOIwUusw0XhiNcK091Atyd0xBofGiCOsO18h8Lobs7dPMpdVbqfL4WR2p2g8/lAnWzgTWACQBTJa2Vk1wDnCScanIwhuzhwDiTJrlnXRQ61LDdEQNca190Ct3FhhtBE61wz4J7PvzfrERljM4cFTbMP3nUOFOefFK0/wAfZrOM93CNUBbsDBebQzGtMc+CzsrQuIa4yDiKDATlwVseXm6aAVpjpnxVPsQwXhMjXCtMuKKq02drQXAQQCRU4ioXGdqf9XkPhanaXO3SBBocc6arUbC3Mny+EFjZGfT5n5XI/aHNJaDABIFBgKDJX15+jeR+Vo3ZGuAJJl1TERJrooHYWIcA5wkmZMkYGBh3BY7Q4sMNMAiYxrUZ8Am63LDdbBAwnGtcuKuzshabzqEbu7hArnOqCdm/yTf3oiMsZnDgFW0sDAHNoSYnGkE58Aptf8UXa3sb3dhERqlZvNqbrqAb1MZFM51QZ2Nq55DXGWmZFBgJFR3hdTtna1pcBBAJxOIqofYBgvAkkYTEVplxWPWnOIaQIdumAZg0OaCDtj8b3AQPhd3ULP6fM/Kg/wBObq7mPhc39ydo3kflB2dQs/p8z8oXH/cnaN5H5Qg6eg7/ACR0sUjCnJV0w71mbImtK15rSH0d7emJ/CYdcpjnp/ME2vDaHLTmpc29UcK/zvQPt90eOP4SuXK45ad/smzcxz07kOdfoONeXugXSX92InPHCqfV43pwrhpVJtmW7xwGmNaKzbgiKyac6KCet/b5/sjqn3eX7qerO1Hn8LXrTdD5fKDPrN3diYpjpTRHRX96YnKJwp7JHZyd4RBrzqrbahoumZGmFa+6BX7m7jNdO72S/wCT7bvjM8tEPYXmW0GFeeXFNm52qzhHdxjVAuj6Pe7U0jDv9kdNf3Yic5nCuHgm99/dbSK15ZcVDbEsN4xA0xrT3RT6rd3r03axGlYxR177fP8AZU7aWuF0AyaDCK01WXUnat5n4QX1D7vL90dbu7t2bu7M4xTRaddbo7y+Vg7ZS43gRDqiZmtdEF9Bf3piconCmPgl0nRbsXp3pwxpGeiplsGC6ZJGmFa58VFow2hvCgFK465TqoH/AMv23fGZ5aJdH0W9N6d2MMaznonZ/wCKb1b2Ed2MzGqdraC0F1tCN6uEYZTqgnrHSbkXZzmcK4eCDsV3evTd3oiJisYqW7OWG+6CBjGNaZ8Vq/a2uBaAZduiYiTStUEf3H7P/X7Jf2z7v/P7qP7e/VvM/C6P7gzR3l8oMv7Z93/n90LX+4M0d5fKEE9G7T0WrXgCCcE741C53NMmma0insJMjBXZuuiDTNVZmBBos7YSaVplVA7Tei7WMf4UrMXTLqDD+QnYUmaYY0TtjIpWuVUDe8OEDE/lYts3AgkUBk4ZJ2TSCCRA710PeCDUYHNQHTt18iubq79PMKSw6HkV2326jmEGbLVoABNQADQ4hY2lmXEuaJBw8KZpPYSSQDiclvYOAaASAa0NDigmxcGCHUMzrTDLglbb8XaxM5YxGPBTtDbxkVEZVzOirZt2b1MImmuqCbFpaZdQRGtaHLgrtbQOBa0yThlgZzT2kyAG1M5VyOixsGkOBIIFakQMDqgltg4EEigIJqMBUrr6yzXyPwi0eCCAQSQQKjRcHRO+k8igvqrvp8x8rps9oaAATBAANDiKFbdK36m8wvPtGOLiQCQSSCAYxRV21k5zi5okHA0GAjNaWDgwQ6hmdaUGXBXs7wGgEgGtCYOJyKw2oFxlu8IiRUYnRQVtO/F2sTOWMRjwKnZ2FhvOoCI1rQ5cCr2PdvXt2YiaTE6p7Y4OaADeMzAqcDogdvbBwLWmSYgQRgZOPcFzM2Z7SHEQAQTUYCpT2Zpa8FwIFakQMDmV2W1q0tIDgSQQACJJIpCA64z6vI/C8/qb/p8x8qTYv+l3Ir1umb9TeYQeX1N/0+Y+U16fTN+pvMIQcS6mYDgELmtMTxK0irXE/wAyWlhh4/CLMUz/AIVnbY+CCtoy8fZTs+Ph8Ktnz8PdVtGHj8oKtuyfD1XMzEcR6qrHtDx9F0vwPA+iC15ya75UCsuyOA9Fx25lx8PRTaYnifVdmzdkePqUE7J2Tx9go23/AF8fZTtfa8Pcqtj/ANvD3QRsfaPD3C32nsHw9Qp2zsjj7FYbN2h4+hQRZdpv6h6r01na9l3A+i82ECXqWPZb+keiI4rzbXtO4n1QXtfbPh6BdOwdk/qPoFpsnYHj6lcu3dofpHqUVX9R/wBf/r2Uf0/tH9J9Qr/p/wDt4e602/sj9Q9CoL23sHw9QvNse039TfVa7J22+PoV6Fv2HfpPog0XgA0VEfz8L3GoPClC95CDgvHUrVgGnejoxos3POC0gtCZ0GgV2QkVrXOqGsBEnFJxigQO1pEU4KbEya1pmqZvY1Q8XRIogq0aACQIWDXGRU4hWx5Jg4LRzABIGFUF3G6DkuLpDqVo60dr6LYWLcx5lA7OzEAkA0GSxtXEOIBgUwoMEnWhBgGgoFsxocJIkqAsBIk1rnXRRtFIu0xmKaaItXFphtBE6+qdlvTerGGWPBBNgZNaiM66arS3aA0kAA0qKHFTatDRLaGY1p48FFm8uIa4yDj4VyQZseSQCTEia967G2bfpHIKH2IAJAqASKnEYLnNu/XyCCekdiSe4SV2WdmIBIBJAJJHcjqzdPM/K5XWzgSAaAkCgwFAgW0OIcQCQKUBgYDJbbK0FpJEmYk1OA1Ts7NrgHOEk4mowpks7dxYYbQROtcM+CCts3Yu7szMUnDRRspLnEO3hEwajEaq7Dfm9WIjLGZw4J27AwS2hmNaY58EFbSwNaSAARFQIOIzC4rO0cXAFxIJAIJOfctbO0c4hrjIOVBgJyW79naAXAVAJFTQioRWwsG5tbyC8vpn/U7mVp1p/wBXkPhdvU2fT5n5UHndK/6ncyhej1Rn0+Z+UIMhaFULMGqVzvTvxRaQi+KBNrb1TwokGTVO9dpjmgHbuGevchpvUPGiO13R7ou3a45IGWBtRl+FItCaa05p371MJ/KOjis4V5IH0A71HTnuVdP3eaOg7/JAxZA1rWvNQ55bujL8p9LFIwpjoncvb0xPtRQNrb1Twp/O9J25hnr3flF65THPT+YI7fdHjj+ECa6/Q4Y05e6brMNF4TI1wrRF25XHLTv9kdJe3Yic8cK+yCRbk0IFac6LTqjdT5fCnq93enCuGlUut/b5/sgjrTtB5/K0bs7XbxJk1pGddEuqfd5fujrF3diYpjpTRBLrUsN0RA1xrXLiqZZ3951CKU558UdFe3piconCnsi/c3Yma6d3sgVp/j7NZxnu4RqkxxfuuoBWmOmfFP8A5Ptjxx5aIudHvdqaRh39+iBvsQwXgTI1wrTLisxtLnbpAh1DEzBpqr6a/uxE5zOFcPBLqt3evTdrEYxXVFX1FurvL4WPXn6N5H5V9f8At8/2R1D7vL90Eddfo3kflCvqH3eX7oQXeCVyapXCqDgqgDoogi9UJOE1CphjFAm7uOeiHG9QeaH1wSYIqUAGRUqjaA01pzQ9wIgKAwisIDoT3LTph3pi0br6rHonaeiBmyJrSteatrw2hy05qmvAEE4LJ7CTIwQN7b9Rwr/O9Nu5jnp3J2brog0z/kJWu9F2se/FQN7r1Bxry91LbMt3jgNO+iLNt0y6mX8hW94cIGJ/KAdbA0g1pzosuqu7vP4QLNwIJFAZOGS36duvkUE9abofL5WR2cneBFa86qegfp5hbstWgAE1Ag0OSCW2oaLpmRphWvupcy+bwoBSvPLiptLMuJcBIOHpmtLFwYIdQzOtMMuCBM3O1WdO7jxQ99/dbQiteWXFK334u1iZyxwx4JWLSwy6giNa004IE2xLDeMQNMa091o7aWuEAGTQYZ01Ra2gcC1pknAYYGc1g2wcCCRQEE1GAqUU+pO1bzPwt+ut0d5fKvrTNfI/C4uqv+nzHyg6evN0dyHyhc3VX/T5j5Qg65WRCS1bgqgaaKCZy7lLzVXZCnigdnTGidoZwqla5JWWPggTBBWrnCDXJFpgsW4jigLh0PJb3xqEwuRBT2mTTNbWZAEGibG0HALC1NT/ADJBVsJNK0yVWFJmmGNFWz4ePwp2nLx9kDtjIpWuVVlZAggkRxVbPj4fC2t+yfD1UA94IIkTBXL0Z0PIpsxHEeq7ZQSbRuo5rjc0kk3TUnLvWZK77HsjgEEWDgGgEgGtDQ4rLaGkmRWmVddFO09o+HoFvsnZPH2CCNm3ZvUmImmuqe0mRDamZpXI6Jbb/r4+yjY+0eHuEE2AIcCQQK1IgYLqtHgggEEkECo0S2nsHw9QuKyq5vEeqBGyd9J5Fej0rfqHMJhq8pB6nSt+ocwmvKQg7lk4yqKbW6rQbBRJ+KHKmhQFlmi0wSchqBMxWz8DwUOFFAJQSugIujQLnJOpQD8TOphb2OA/maGNECiyeYMBAbRj4fKrZ8/D3TshIrWuaVtSIpjgge0YePysrHtDx9FdkZNa0zV2gABIpwQVaHdPArhlagkkCTiF0tYMwOSgpohcb8TxPqi+dTzXUxggUGAyQPZ+yPH1K59r7Xh7lK2JBIBIGg4LWwEiTWuddEE7H/t4e6rbOyOPsVO07sXaY4U00U7MZMOrTOumqCNm7Q8fQrqed08D6KbdoDSQADSoocVzMcSQCTiBj3oM3aleosxZN+kcguDpHfUeZQenKF5nSO+o8yhB1QplO8i6tAAQTGCJQBKAbXFN1MEjRAMqAaZoVRaEi2KpB80QLpDqtejGikWYU9IUAXlU1oNSgMBqkXxRAPMUCLPexrCA29U8EO3cM9e5A3i6JFFDXEmDgqa69Q8aJuYG1GX4QNzAASBhVZdK7X0VC0JpStOaroB3oK6JunmVibQgkA0FB4J9Oe5WLIGta15oGxgcJNSs7VxaYbQROtfFDnlu6MBrzVMbeqeFOfuoFY783qxEZY8OCdq0NEtoZjX1SfuYZ6935Q11+h405e6CLN5cQ1xkH2rktn2LQCQKgEipxFQpdZBgvDEa4Vp7qBbk0MQac6IIO0P18h8Lq6u3TzPyo6q3U+Xwsetu0Hn8oOnq7dPM/KFzdbdoPP5TQXdRKJShaDhEwnKRCAxREIFEEygL00RciqAIqmXKA6TuR0fepuFVfCA6SKQi5NUrhVB8UQK9dpjmjtd0e6HC9UIbu456IC7drjki/ephP5Q516g41QGRUoDo4rOFeSOn7vNM2gNNac1HQnuQV0Hf5JdNFIwpjoq6cd6g2RNaVrzQPo729MT+E79ymOend7IbaBtDl+UnNv1HCv8AO9AEX+6PHH8IuXK45ad/shm5jnp3flN7r1Bxry91AukvbsROeOFfZHV43pmKxGlUm2ZabxwGnfRUbcGgmtOdEC639vn+yXVPu8v3S6q7Uea0603Q+Xygjqn3eX7pqutN0Pl8oQQmCkktBphK6iUDKAgIcgZKkBAVEoHfCzuFELQuGqgLwWdTWEnLRhpVA2GMUn1wSfXBNlMUCYIqVT3AiAi0rgoYINUAGHFa9I3VJzhBrksLp0KCujOnotQ8ChOFE5Go5rBzSSaZlA3sJMjBXZuDRBpmqszAg0WdsJNK0yqgdpvRdrGPjxSs23TJpl/ITsKTNMMaJ2xkUrXKqAe8OEDFZNsnAgkUBk+Cdm0ggkRx4La0eINRgUA63bkfIrmFg/TzCm47Q8l3X2/UOYUHJ0DtPMIXX0jdRzCSDFIJpELQZ702pAIQNyGoahyBuUBMKigcrGUyFo0IBgoodigrRuCgVngi1yUvxTs0BZ4q3mim0wUtxQS3EcQtwk7A8FgQgJXTZ4DgELnfieJQO17R/mS0sMPH4TssB/M1lb4+CCtpy8fZTs+Ph8Ktnz8PdPaMPH5QPaDunw9QuWyxHEeq0s27w8fRdLuyeB9EDAXAmV3oPOQvRQg50IQqAIQhA2ochCBNVFCEEK0IUEFaNwQhBD07NNCAtMFLcUIQaOwPBYIQg6VzvxPEoQg2ssAsrfHwQhBWz5+Ce0YePyhCDKx7Q8fRdNpgeBQhBxFd6EIBCEIP/9k=`)
    const imageMemo = useMemo(() => (
        <div className="bg-cyan-300 px-[4px] pb-1">
            <div className="h-[200px] relative w-full">
                <IconButton className="absolute right-0 top-0 z-10" onClick={deleteImage}>
                    <CloseIcon className="text-red-500 hover:text-cyan-700" />
                </IconButton>
                <Image 
                    alt={ file.image ? file.image.name : "" }
                    className="object-contain"
                    layout="fill"
                    src={file.url ? file.url : emptyImage.current}
                />
            </div>
        </div>
    ), [ deleteImage, file ]);

    const optionsButtonMemo = useMemo(() => (
        <IconButton 
            className={classNames({ "text-red-500 dark:text-slate-300": expanded }, "hover:text-cyan-600 dark:text-slate-300", )}
            type="button" 
            onClick={toggleExpanded}>
            { expanded ? <CloseIcon  className=" " /> : <AddIcon className="hover:text-cyan-600 dark" /> }
        </IconButton>
    ),[ expanded, toggleExpanded ]);

    const inputMemo = useMemo(() => (
        <input 
                className="bg-transparent grow p-2 text-base focus:outline-cyan-600"
                onChange={changeHandler}
                ref={inputRef}
            />
    ), [ changeHandler ]);

    

    const onEmojiClick = (event, emojiObject) => {
        inputRef.current.value = inputRef.current.value + emojiObject.emoji;
    };

    const collapseMemo = useMemo(() => (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className="bg-cyan-300 flex items-center flex-wrap dark:bg-stone-600">
                <IconButton className="mr-1 " onClick={() => setOpenEmojis(b => !b)}>
                    <InsertEmoticonIcon  className="dark:text-slate-300 dark:hover:text-cyan-600 hover:text-cyan-600" />
                </IconButton>
                <IconButton onClick={imageButtonClickHandler}>
                    <PhotoIcon  className="dark:text-slate-300 dark:hover:text-cyan-600 hover:text-cyan-600" />
                </IconButton>
            </div>
            <Collapse in={openEmojis} timeout="auto" unmountOnExit>
                <NoSSREmojiPicker onEmojiClick={onEmojiClick} />
            </Collapse>
        </Collapse>
    ), [ expanded, imageButtonClickHandler, openEmojis ])

    const submitButtonMemo = useMemo(() => (
        <IconButton type="submit" disabled={!canISubmit && !file.image}>
            <SendIcon className="hover:text-cyan-600 dark:text-slate-300" />
        </IconButton>
    ), [ canISubmit, file ])
    

    const submitHandler = useCallback(event => {
        event.preventDefault();
        sendHandler({ inputRef, imageRef })
        setCanISubmit(false)
    }, [ sendHandler ]);

    const hasRepliedMessage = useMemo(() => Object.keys(repliedMessage).length > 0, [ repliedMessage ]);

    return (
        <div className={classNames(`bottom-20 flex flex-col fixed items-stretch w-full z-10 md:absolute 
            md:bottom-3 dark:bg-stone-500 dark:md:bg-stone-600`,
            { "bg-cyan-300 py-2": hasRepliedMessage })}>
            <Collapse in={Boolean(file.image)} timeout="auto" unmountOnExit>
                { imageMemo }
            </Collapse>
            { hasRepliedMessage && repliedMessageMemo }
            <form 
                className="bg-cyan-300 flex items-center w-full dark:bg-stone-500 dark:md:bg-stone-600"
                onSubmit={submitHandler}>
                { optionsButtonMemo }
                { inputMemo }
                <input 
                    className="hidden" 
                    ref={fileRef} 
                    type="file" 
                    onChange={fileChangeHandler} 
                />
                { submitButtonMemo }
            </form>
            { collapseMemo }
        </div>
    );
};

export default TextfieldContainer;