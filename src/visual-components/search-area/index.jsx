import React, { Component } from 'react';
import Router from 'next/router';
import Suggestion from './suggestion';
import './style.less';
import DictSelect from './dict-select';

class SearchArea extends Component {
  state = {
    searchText: this.props.initSearchText || '',
    dictType: 'envi',
    isSearchInputFocus: false
  };

  componentDidMount() {
    const dictType = localStorage.getItem('next-dict-dict-type') || 'envi';
    this.setState({ dictType });
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimer);
    clearTimeout(this.onSearchInputBlurTimeout);
    this.delayTimer = null;
    this.onSearchInputBlurTimeout = null;
  }

  onSearchTextChange = e => {
    const { dictType } = this.state;
    const { searchKeyword } = this.props;
    const searchText = e.target.value;
    this.setState({ searchText });
    clearTimeout(this.delayTimer);

    const word = searchText.trim().toLowerCase();
    if (!word) {
      searchKeyword('');
      return;
    }

    this.delayTimer = setTimeout(() => {
      this.delayTimer = null;
      searchKeyword(word, dictType);
    }, 500);
  };

  onSubmit = e => {
    const { searchText, dictType } = this.state;
    const { data, searchKeyword } = this.props;
    e.preventDefault();
    clearTimeout(this.delayTimer);

    let word = searchText.trim().toLowerCase();

    if (!word) {
      return;
    }
    searchKeyword('');

    if (data && data.length && data[0].toLowerCase().includes(word)) {
      word = data[0];
    }
    Router.push(`/word?id=${word}&type=${dictType}`, `/word/${word}?type=${dictType}`).then(() =>
      window.scrollTo(0, 0)
    );
  };

  onSearchTextClear = () => {
    const { searchKeyword } = this.props;
    this.setState({ searchText: '' });
    searchKeyword('');
  };

  onSuggestItemClick = suggestionItem => {
    const { dictType } = this.state;
    const { onSuggestItemClick } = this.props;
    this.setState({ searchText: suggestionItem });
    onSuggestItemClick(suggestionItem, dictType);
  };

  onDictTypeChange = dictType => {
    this.setState({ dictType });
  };

  onSearchInputFocus = e => {
    this.setState({ isSearchInputFocus: true });
    this.onSearchTextChange(e);
  };

  onSearchInputBlur = () => {
    this.onSearchInputBlurTimeout = setTimeout(() => {
      this.setState({ isSearchInputFocus: false });
    }, 100);
  };

  render() {
    const { data } = this.props;
    const { searchText, dictType, isSearchInputFocus } = this.state;

    return (
      <div className='search-area-component'>
        <form onSubmit={this.onSubmit}>
          <div className='input-field'>
            <input
              id='searchInput'
              type='text'
              placeholder='Search'
              aria-label='Search input box'
              value={searchText}
              onChange={this.onSearchTextChange}
              onFocus={this.onSearchInputFocus}
              onBlur={this.onSearchInputBlur}
              onClick={e => e.target.select()}
            />
            {searchText && (
              <span className='clear-btn' onClick={this.onSearchTextClear}>
                <svg viewBox='0 0 512 512' className='clear-btn-icon'>
                  <path d='M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M359.54,329.374 c4.167,4.165,4.167,10.919,0,15.085L344.46,359.54c-4.167,4.165-10.919,4.165-15.086,0L256,286.167l-73.374,73.374 c-4.167,4.165-10.919,4.165-15.086,0l-15.081-15.082c-4.167-4.165-4.167-10.919,0-15.085l73.374-73.375l-73.374-73.374 c-4.167-4.165-4.167-10.919,0-15.085l15.081-15.082c4.167-4.165,10.919-4.165,15.086,0L256,225.832l73.374-73.374 c4.167-4.165,10.919-4.165,15.086,0l15.081,15.082c4.167,4.165,4.167,10.919,0,15.085l-73.374,73.374L359.54,329.374z' />
                </svg>
              </span>
            )}
          </div>
          <button type='submit' ref='submitBtn' aria-label='Submit'>
            <svg viewBox='0 0 515.558 515.558' className='submit-icon'>
              <path d='m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z' />
            </svg>
          </button>

          <DictSelect defaultDictType={dictType} onDictTypeChange={this.onDictTypeChange} />

          <Suggestion data={data} onSuggestItemClick={this.onSuggestItemClick} isShow={isSearchInputFocus} />
        </form>
      </div>
    );
  }
}

export default SearchArea;
