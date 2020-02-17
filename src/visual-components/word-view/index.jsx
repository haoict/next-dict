import React, { Component } from 'react';
import Head from 'next/head';
import './style.less';

class WordView extends Component {
  render() {
    const { id, isLoading, data, error } = this.props;
    let trans;

    if (isLoading) {
      trans = <div className='loading'>Loading...</div>;
    } else if (error) {
      trans = error.message ? error.message : JSON.stringify(error);
    } else if (!data || !data.length) {
      trans = 'Not found';
    } else {
      trans = data.map((tran, index) => {
        if (!tran) return null;
        return (
          <div className='tran' key={index}>
            <div
              dangerouslySetInnerHTML={{
                __html: tran.trim()
              }}></div>
            {index !== data.length - 1 ? <hr /> : ''}
          </div>
        );
      });
      trans = trans.filter(tran => tran !== null);
    }

    return (
      <div className='word-view-container'>
        <Head>
          <title>{id}</title>
        </Head>
        <div className='word-view-component'>
          <h1>{id}</h1>
          <div className='info'>{trans}</div>
        </div>
      </div>
    );
  }
}

export default WordView;
