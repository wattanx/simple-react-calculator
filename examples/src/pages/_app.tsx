import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CustomHead } from '../components/CustomHead';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                minHeight: 'calc(var(--vh, 1vh) * 100)',
                margin: 0,
                padding: 0,
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
            },
        },
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <CustomHead />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
