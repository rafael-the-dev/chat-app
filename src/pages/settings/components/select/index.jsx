import { MenuItem, TextField } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';

const CustomTextfield = styled(TextField)({
    '.dark & label': {
        color: '#cbd5e1',
    },
    '& .MuiSelect-select': {
        '& .MuiSvgIcon-root': {
            display: 'none',
        }
    },
    '.dark & .MuiSelect-select': {
        color: "#cbd5e1"
    },
    '.dark & .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#f1f5f9',
        },
        '&:hover fieldset': {
            borderColor: '#1e40af',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0d9488',
        },
        '& .MuiSvgIcon-root': {
            color: '#cbd5e1'
        }
    },
})

const SelectContianer = () => {
    const [ font, setFont ] = useState();

    const fonts = useMemo(() => {
        return [
            { label: "Roboto", value: "roboto" },
            { label: "Serif", value: "serif" },
            { label: "Sans SERIF", value: "sans-serif" }
        ];
    }, [])

    const handleChange = useCallback((event) => {
        setFont(event.target.value);
    }, []);

    return (
        <div className="mt-4 px-4">
            <CustomTextfield
                classes={{ root: "dark:border-slate-300" }}
                fullWidth
                id="outlined-select-currency"
                label="Select font family"
                value={font}
                onChange={handleChange}
                select
                SelectProps={{
                    MenuProps: {
                        PaperProps: {
                            className: "dark:bg-stone-600"
                        }
                    }
                }}
                >
                {fonts.map((option) => (
                    <MenuItem 
                        className="flex items-center justify-between dark:hover:bg-stone-500 dark:bg-stone-600 dark:text-slate-300" 
                        key={option.value} 
                        value={option.value}>
                        <span>
                            { option.label }
                        </span>
                        { font === option.value && <CheckIcon /> }
                    </MenuItem>
                ))}
            </CustomTextfield>
        </div>
    );
};

export default SelectContianer;