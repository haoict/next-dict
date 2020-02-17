import { fetchApi } from './utils';

function searchKeyword(key, type) {
  return fetchApi('dict/search', null, { key, type });
}

export const searchService = {
  searchKeyword
};
