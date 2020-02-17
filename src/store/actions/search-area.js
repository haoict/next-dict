import { searchService } from '../../services/search-service';

function searchKeyword(name, type) {
  return async (dispatch, getState) => {
    try {
      if (!name) {
        dispatch({ type: 'SEARCH_KEYWORD_SUCCESS', data: [] });
        return;
      }
      dispatch({ type: 'SEARCH_KEYWORD_LOADING' });
      const response = await searchService.searchKeyword(name, type);
      if (response.result) {
        dispatch({ type: 'SEARCH_KEYWORD_SUCCESS', data: response.data });
        return;
      }
      dispatch({ type: 'SEARCH_KEYWORD_ERROR', error: response });
    } catch (error) {
      dispatch({ type: 'SEARCH_KEYWORD_ERROR', error: error });
    }
  };
}

export { searchKeyword };
