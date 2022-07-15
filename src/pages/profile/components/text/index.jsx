import { Typography } from "@mui/material"

const Container = ({ label, size }) => (
    <Typography 
        className="text-center text-sm"
        component="p">
        <span
            className="font-bold">
            { size < 10 && "0"}{ size }
        </span><br/>
        { label }{ size > 1 && "s" }
    </Typography>
);

export default Container;