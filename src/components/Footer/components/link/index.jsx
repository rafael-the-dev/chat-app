import { IconButton } from '@mui/material'
import Link from "next/link"

const LinkContainer = ({ href, children }) => {
    return (
        <Link href={href}>
            <a>
                <IconButton>
                    { children }
                </IconButton>
            </a>
        </Link>
    );
};

export default LinkContainer;