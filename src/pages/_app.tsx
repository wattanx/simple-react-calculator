import { CustomHead } from '../components/CustomHead';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <CustomHead />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
