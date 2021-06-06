import { ReactCalculator } from '@src/components/ReactCalculator'
import Link from 'next/link'
import { createGlobalStyle } from 'styled-components'
import Layout from '../components/Layout'

const IndexPage = () => (
  <>
    <GlobalStyle />
    <ReactCalculator />
  </>
)

export default IndexPage

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`