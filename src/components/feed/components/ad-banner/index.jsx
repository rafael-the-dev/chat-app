import { Typography } from "@mui/material"
import classNames from "classnames"
import classes from "./styles.module.css"

const AdBanner = () => {
    return (
        <section className={classNames(classes.banner, `flex flex-col grow items-center justify-center 
            px-4 rounded-xl text-center`)}>
            <Typography
                className="font-bold text-3xl text-white"
                component="h2">
                Chat APP
            </Typography>
            <Typography
                className="mt-3 text-slate-100">
                Simple &amp; Reliable messaging.<br/>
                you'll get fast, simple, secure messaging and calling for free*, 
                available on phones all over the world.
            </Typography>
        </section>
    );
};

export default AdBanner;