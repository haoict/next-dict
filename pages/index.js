import React from 'react';
import Head from 'next/head';
import SearchAreaContainer from '../src/container-components/search-area';
import { serviceWorkerRegister } from '../src/helpers/service-worker-register';

class Index extends React.Component {
  componentDidMount() {
    serviceWorkerRegister();
  }

  render() {
    const title = 'Next Dictionary!!';

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div style={{ width: '70%', maxWidth: 350, margin: '0 auto 50px', textAlign: 'center' }}>
          <img src='/static/assets/images/logo.png' alt='logo' style={{ width: 'auto', maxHeight: 125 }} />
        </div>
        <SearchAreaContainer />
        <br />
      </>
    );
  }
}

export default Index;
