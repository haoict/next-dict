// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import Document, { Html, Head, Main, NextScript } from 'next/document';
import envConfig from '../src/config/env-config';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Must */}
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no' />
          <meta http-equiv='X-UA-Compatible' content='IE=edge' />
          <link rel='icon' type='image/x-icon' href='/static/assets/images/favicon.ico' />
          <meta name='description' content='Next generation of Dictionaries!!' />
          <meta name='keywords' content='dictionary' />
          <link rel='manifest' href='/manifest.json' />

          {/* Android */}
          <meta name='theme-color' content='#c40012' />
          <meta name='mobile-web-app-capable' content='yes' />

          {/* iOS */}
          <meta name='apple-mobile-web-app-title' content='Next generation of Dictionaries!!' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <link rel='apple-touch-icon' href='/static/assets/images/favicon.ico'></link>

          {/* Windows */}
          <meta name='msapplication-navbutton-color' content='#c40012' />
          <meta name='msapplication-TileColor' content='#c40012' />
          <meta name='msapplication-TileImage' content='/static/assets/images/favicon.ico' />
          {/* <meta name='msapplication-config' content='browserconfig.xml' /> */}

          <script
            dangerouslySetInnerHTML={{
              __html: `window.apiUrl="${envConfig.app.apiUrl}"`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
