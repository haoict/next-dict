import { fetchApi } from './utils';

function fetchWordData(id, type) {
  return fetchApi('dict/', id, { type });
}

export const wordService = {
  fetchWordData
};
