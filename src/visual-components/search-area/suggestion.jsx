import React, { Component } from 'react';
import './suggestion-style.less';

class Suggestion extends Component {
  render() {
    const { data, onSuggestItemClick, isShow } = this.props;

    if (!data || !data.length) return null;

    const items = data.map(item => {
      return (
        <div
          key={item}
          className='suggestion-item'
          onClick={() => {
            onSuggestItemClick(item);
          }}>
          <div className='word'>{item}</div>
        </div>
      );
    });

    if (!items || !items.length) return null;

    return (
      <div className='suggestion-component' style={isShow ? {} : { display: 'none' }}>
        {items}
      </div>
    );
  }
}

export default Suggestion;
