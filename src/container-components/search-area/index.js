import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchArea from '../../visual-components/search-area';
import { searchKeyword } from '../../store/actions/search-area';
import Router from 'next/router';

class SearchAreaContainer extends Component {
  onSuggestItemClick = (id, type) => {
    this.props.searchKeyword('');
    const idEncoded = encodeURIComponent(id);
    Router.push(`/word?id=${idEncoded}&type=${type}`, `/word/${idEncoded}?type=${type}`).then(() =>
      window.scrollTo(0, 0)
    );
  };

  render() {
    const { initSearchText, searchKeyword, isLoading, data, error } = this.props;
    return (
      <SearchArea
        initSearchText={initSearchText}
        searchKeyword={searchKeyword}
        isLoading={isLoading}
        data={data}
        error={error}
        onSuggestItemClick={this.onSuggestItemClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.searchArea.isLoading,
  data: state.searchArea.data,
  error: state.searchArea.error
});

const mapDispatchToProps = dispatch => ({
  searchKeyword: (name, dictType) => {
    dispatch(searchKeyword(name, dictType));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAreaContainer);
