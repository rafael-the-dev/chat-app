import { createContext, useCallback, useEffect, useRef, useState } from "react";


export const ThemeContext = createContext();
ThemeContext.displayName = "ThemeContext";

export const ThemeContextProvider = ({ children }) => {
    const [ settings, setSettings ] = useState({ isDarkTheme: false });

    const toggleTheme = useCallback(() => setSettings(oldTheme => ({ ...oldTheme, isDarkTheme: !oldTheme.isDarkTheme })), []);
    const localStorageName = useRef("__chat-app__");

    useEffect(() => {
        const savedTheme = localStorage.getItem(localStorageName.current);
        if(savedTheme === null) {
            localStorage.setItem(localStorageName.current, JSON.stringify({ isDarkTheme: false }));
        } else {
            setSettings(JSON.parse(savedTheme));
        }
    }, []);

    useEffect(() => {
        if(settings.isDarkTheme) {
            document.querySelector("html").classList.add("dark");
        } else {
            document.querySelector("html").classList.remove("dark");
        }
        
        localStorage.setItem(localStorageName.current, JSON.stringify(settings));
    }, [ settings ]);

    return (
        <ThemeContext.Provider value={{ ...settings, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};