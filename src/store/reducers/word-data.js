const initState = {
  isLoading: false,
  data: null,
  error: null
};

const wordData = (state = initState, action) => {
  switch (action.type) {
    case 'GET_WORD_DATA_LOADING':
      return { isLoading: true };
    case 'GET_WORD_DATA_SUCCESS':
      return { isLoading: false, data: action.data };
    case 'GET_WORD_DATA_ERROR':
      return { isLoading: false, error: action.error };
    default:
      return state;
  }
};

export { wordData };
