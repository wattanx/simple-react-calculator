import { Box } from '@chakra-ui/react';
import { useFontResize } from '@src/hooks/useFontResize';

type DisplayProps = {
    value: string;
};

export const Display: React.VFC<DisplayProps> = (props) => {
    const { divRef, spanRef } = useFontResize(props.value);

    return (
        <Box
            w="100%"
            h="20%"
            bg="#323232"
            fontSize="13vmin"
            color="white"
            display="flex"
            alignItems="flex-end"
            flexDirection="column-reverse"
            ref={divRef}
        >
            <Box margin="16px">
                <span ref={spanRef}>{props.value}</span>
            </Box>
        </Box>
    );
};
