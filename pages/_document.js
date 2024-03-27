import { Head, Html, Main, NextScript } from 'next/document';
import config from '../config';

export default function Document() {
  const head = config.site.head;
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/fonts/Ruluko.css" />
        <link rel="stylesheet" href="/fonts/ZCool.css" />
        <meta property="og:title" key="og.title" content={head.title} />
        <meta
          property="og:description"
          key="og.description"
          content={head.description}
        />
        <meta
          property="og:image"
          itemProp="image"
          key="og.image"
          content={head.image.logo}
        />
        <meta property="fb:app_id" key="fb.id" content={head.facebookAppId}/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
