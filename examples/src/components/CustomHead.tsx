import Head from 'next/head';
import { useRouter } from 'next/router';
import { config } from 'site.config';

export const CustomHead: React.VFC = () => {
    const title = config.siteMeta.title;
    const description = config.siteMeta.description;
    const pageUrl: string = `${config.siteRoot}/`;
    const baseUrl =
        process.env.NODE_ENV === 'production' ? process.env.BASEURL : 'http://localhost:3000';
    const url = baseUrl + useRouter().pathname;

    return (
        <Head>
            <title>{config.siteMeta.title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:site" content={config.siteMeta.title} />
            <meta />
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <link rel="canonical" href={url} />
            <link
                rel="icon"
                href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🐱‍👤</text></svg>"
            ></link>
        </Head>
    );
};
