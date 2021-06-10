import { ReactCalculator } from '@src/components/ReactCalculator';
import { useHeightResize } from '@src/hooks/useHeightResize';
import Link from 'next/link';
import { createGlobalStyle } from 'styled-components';

const IndexPage = () => {
    useHeightResize();
    return (
        <>
            <GlobalStyle />
            <ReactCalculator />
        </>
    );
};

export default IndexPage;

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    margin: 0;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
