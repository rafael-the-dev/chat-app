import { Hidden, Typography } from "@mui/material"

const Container = ({ label, size }) => (
    <Typography 
        className="text-center text-sm sm:flex sm:items-center"
        component="p">
        <span
            className="font-bold text-base sm:mr-2">
            { size < 10 && "0"}{ size }
        </span><Hidden smUp><br/></Hidden>
        { label }{ size > 1 && "s" }
    </Typography>
);

export default Container;