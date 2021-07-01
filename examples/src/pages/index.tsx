import { ReactCalculator } from 'simple-react-calculator';
import { useHeightResize } from '@src/hooks/useHeightResize';

const IndexPage = () => {
    useHeightResize();
    return <ReactCalculator />;
};

export default IndexPage;
