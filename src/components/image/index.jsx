import Image from "next/image"
import { styled } from '@mui/material/styles'

import { getURL } from "src/helpers"

const CustomImage = styled(Image)({
    '&': {
        height: 'auto !important',
        maxHeight: 'unset !important',
        width: '100% !important'
    }
});

const Container = ({ alt, layout, url }) => {
    const myLoader = () => url;

    return (
        <CustomImage 
            alt={alt}
            className="bg-black"
            height={170}
            loader={myLoader}
            layout={layout}
            src={getURL({ url })}
            unoptimized={true}
            width={170}
        />
    );
};

export default Container;