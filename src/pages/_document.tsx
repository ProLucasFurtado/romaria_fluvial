import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    let dataLayer = [];

    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-237457012-1" />
          <script>
            window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', 'UA-237457012-1');
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
