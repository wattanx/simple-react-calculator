import { ReactCalculator } from '@src/components/ReactCalculator';
import { useHeightResize } from '@src/hooks/useHeightResize';

const IndexPage = () => {
    useHeightResize();
    return <ReactCalculator />;
};

export default IndexPage;
