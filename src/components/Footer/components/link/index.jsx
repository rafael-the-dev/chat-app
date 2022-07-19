import { IconButton } from '@mui/material'
import classNames from "classnames"
import Link from "next/link"

const LinkContainer = ({ href, children }) => { 
    return (
        <Link href={href}>
            <a className={classNames({ "md:ml-[4px]": href === "chat" })}>
                <IconButton>
                    { children }
                </IconButton>
            </a>
        </Link>
    );
};

export default LinkContainer;