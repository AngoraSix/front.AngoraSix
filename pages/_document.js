import { Head, Html, Main, NextScript } from "next/document"
import config from "../config"

export default function Document() {
  const head = config.site.head
  const analyticsId = config.google.analyticsPropertyId

  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/fonts/Lato.css" />
        <meta name="robots" content="index, follow" />
        <meta property="fb:app_id" key="fb.id" content={head.facebookAppId} />

        {/* Google Analytics GA4 */}
        {analyticsId && analyticsId !== "google-analytics-property-id" && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${analyticsId}');
                `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
