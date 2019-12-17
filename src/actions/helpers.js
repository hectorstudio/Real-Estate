import { getAuthToken } from '../selectors/user';
import { FETCH_RESPONSE_STATUS_THROW } from '../constants';

// TODO: Replace all requests using auth token with fetchWithAuth

/**
 *
 * @param {string} url Request URL
 * @param {object} options Fetch options
 */
export const fetchBase = (url, options) => fetch(url, options)
  .then((response) => {
    if (FETCH_RESPONSE_STATUS_THROW.includes(response.status)) {
      throw new Error(response.status);
    }

    return response;
  });

/**
*
* @param {object} options Fetch options
* @param {string} options.url Request URL
* @param {string} options.contentType Body content type, defaults to application/json
* @param {object} options.headers Request custom headers
* @param {string} options.method Request method, defaults to GET
* @param {string} options.body Request body
*/
export const fetchWithAuth = (options) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  const {
    body,
    contentType = 'application/json',
    headers = {},
    method = 'GET',
    url,
  } = options;


  return fetchBase(url, {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': contentType,
      ...headers,
    },
    method,
  });
};
