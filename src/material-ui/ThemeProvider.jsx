import { useContext } from "react"
import { ThemeProvider } from '@mui/material/styles';

import { ThemeContext } from "src/context/ThemeContext"

const ThemeProviderContainer  = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <ThemeProvider theme={theme}>
            { children }
        </ThemeProvider>
    );
};

export default ThemeProviderContainer;