import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();
ThemeContext.displayName = "ThemeContext";

export const ThemeContextProvider = ({ children }) => {
    const [ settings, setSettings ] = useState({ fontFamily: "Roboto", isDarkTheme: false });
    const { fontFamily } = settings;

    const theme = useMemo(() =>
        createTheme({
            typography: {
                fontFamily: `"${fontFamily}", "sans-serif"`,
                "fontSize": 14,
                "fontWeightLight": 300,
                "fontWeightRegular": 400,
                "fontWeightMedium": 500
            }
    }),[ fontFamily ]);

    const addFontFamily = useCallback((font) => setSettings(oldTheme => ({ ...oldTheme, fontFamily: font })), []);

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
        <ThemeContext.Provider value={{ ...settings, addFontFamily, theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};