import React, { Component } from 'react';
import './dict-select-style.less';

const DICT_TYPES = [
  { type: 'envi', display: 'En - Vi', enable: true },
  { type: 'vien', display: 'Vi - En', enable: true },
  { type: 'javi', display: 'Ja - Vi', enable: false },
  { type: 'jaen', display: 'Ja - En', enable: false }
];

class DictSelect extends Component {
  state = {
    selectedOption: 'envi'
  };

  componentDidMount() {
    const dictType = localStorage.getItem('next-dict-dict-type') || 'envi';
    this.setState({ selectedOption: dictType });
  }

  handleOptionChange = e => {
    this.setState({ selectedOption: e.target.value });
    localStorage.setItem('next-dict-dict-type', event.target.value);
    this.props.onDictTypeChange(e.target.value);
  };

  render() {
    const dicts = DICT_TYPES.map(dict => {
      return (
        <div className={dict.enable ? 'dict-radio' : 'dict-radio disabled'} key={dict.type}>
          <input
            type='radio'
            name='selector'
            value={dict.type}
            id={dict.type}
            checked={this.state.selectedOption === dict.type}
            onChange={this.handleOptionChange}
            disabled={!dict.enable}
          />
          <label htmlFor={dict.type}>{dict.display}</label>
        </div>
      );
    });
    return (
      <div className='dict-select-component'>
        <div className='radio-group'>{dicts}</div>
      </div>
    );
  }
}

export default DictSelect;
