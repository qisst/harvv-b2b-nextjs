import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <title>Harvv Financing - Factor Now, Pay Later</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Harvv Financing provides flexible invoice factoring with 100% advance, low fees, no risk, and no personal guarantees. Boost your cash flow today!"
        />
        <meta
          name="keywords"
          content="invoice factoring, business financing, cash flow solutions, B2B financing, payment solutions, invoice management, business loans"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Harvv Financing" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Harvv Financing - Factor Now, Pay Later"
        />
        <meta
          property="og:description"
          content="Transform your business cash flow with 100% advance, no risk, low fees, and no personal guarantees."
        />
        {/* <meta
          property="og:image"
          content="https://harvv.com/assets/Logo/qp.png"
        />
        <meta property="og:url" content="https://harvv.com" /> */}
        <meta property="og:type" content="website" />

        {/* <!-- Twitter Card Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Harvv Financing - Factor Now, Pay Later"
        />
        <meta
          name="twitter:description"
          content="Transform your business cash flow with 100% advance, no risk, low fees, and no personal guarantees."
        />
        {/* <meta
          name="twitter:image"
          content="https://harvv.com/assets/Logo/qp.png"
        />
        <link rel="canonical" href="https://harvv.com" /> */}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
