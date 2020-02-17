import { wordService } from '../../services/word-data-service';

function getWordData(id, type) {
  return async (dispatch, getState) => {
    try {
      if (!id) {
        return;
      }
      dispatch({ type: 'GET_WORD_DATA_LOADING' });
      const response = await wordService.fetchWordData(id, type);
      if (response.result) {
        dispatch({ type: 'GET_WORD_DATA_SUCCESS', data: response.data });
        return;
      }
      dispatch({ type: 'GET_WORD_DATA_ERROR', error: response });
    } catch (error) {
      dispatch({ type: 'GET_WORD_DATA_ERROR', error: error });
    }
  };
}

export { getWordData };
