import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchArea from '../../visual-components/search-area';
import { searchKeyword } from '../../store/actions/search-area';
import Router from 'next/router';

class SearchAreaContainer extends Component {
  onSuggestItemClick = id => {
    this.props.searchKeyword('');
    Router.push(`/word?id=${id}`, `/word/${id}`).then(() => window.scrollTo(0, 0));
  };

  render() {
    const { searchKeyword, isLoading, data, error } = this.props;
    return (
      <SearchArea
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
  searchKeyword: (name, isfullsearch) => {
    dispatch(searchKeyword(name, isfullsearch));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAreaContainer);
