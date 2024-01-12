import { publicRoutes } from './constants';

/**
 * Prepare url with api prefix and path variables
 * @param {String} apiUrl Ex: /product/{id}
 * @param {Object} pathVariables optional Ex: { id: 1 }
 * @returns {String} complete url Ex: /api/product/1
 */
export const prepareUrl = (apiUrl, pathVariables = {}) => {
  let url = apiUrl;
  for (const prop in pathVariables) {
    const replaceKey = new RegExp(`{${prop}}`, 'g');
    const value = pathVariables[prop];
    url = url.replace(replaceKey, value);
  }
  return url;
};

/**
 * Prepare
 * @param {Object} queryParams optinal Ex: { firstName: 'John', lastName: 'Smith' }
 * @returns {String} query string Ex: firstName=John&lastName=Smith
 */
export const prepareQueryParams = (queryParams = {}) => {
  const params = new URLSearchParams(queryParams);
  return params.toString();
};

export const prepareHeaders = (options = {}) => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const headers = {
    timezone: timeZone
  };
  if (!options.formData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

/**
 * Perform a http request
 * @param {String} url
 * @param {String} method
 * @param {Object} data
 * @param {Object} options { queryParams: optinal, pathVariables: optional }
 * @returns {Promise}
 */
export const requestData = async (
  url,
  method,
  data,
  options = { queryParams: {}, pathVariables: {}, isRequestFile: false, formData: false }
) => {
  const finalHeaders = prepareHeaders(options);
  let finalUrl = prepareUrl(url, options.pathVariables);
  const finalQueryParams = prepareQueryParams(options.queryParams);
  if (finalQueryParams) {
    finalUrl += `?${finalQueryParams}`;
  }
  let requestOptions = {
    method: method,
    headers: finalHeaders
  };
  if (data) {
    let submitData = JSON.stringify(data);
    if (options.formData) {
      submitData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        submitData.append(key, value);
      }
    }
    requestOptions.body = submitData;
  }
  return fetch(finalUrl, requestOptions).then(async (response) => {
    if (response.ok) {
      if (options.isRequestFile) {
        return response.arrayBuffer();
      }
      return response.json();
    }
    if ([401, 403].includes(response.status) && window.location.pathname !== publicRoutes.login) {
      window.location.replace(publicRoutes.login);
    }
    throw await response.json();
  });
};

/**
 * Perform fetch GET request
 * @param {String} url
 * @param {Object} options { queryParams: optinal, pathVariables: optional }
 */
export const getData = (url, options) => {
  return requestData(url, 'GET', null, options);
};

/**
 * Perform fetch POST request
 * @param {String} url
 * @param {Object} data optional
 * @param {Object} options { queryParams: optinal, pathVariables: optional }
 */
export const postData = (
  url,
  data,
  options = { queryParams: {}, pathVariables: {}, formData: false }
) => {
  return requestData(url, 'POST', data, options);
};

/**
 * Perform fetch PUT request
 * @param {String} url
 * @param {Object} data optional
 * @param {Object} options { queryParams: optinal, pathVariables: optional }
 */
export const putData = (url, data, options = { queryParams: {}, pathVariables: {} }) => {
  return requestData(url, 'PUT', data, options);
};

/**
 * Perform fetch DELETE request
 * @param {String} url
 * @param {Object} data optional
 * @param {Object} options { queryParams: optinal, pathVariables: optional }
 */
export const deleteData = (url, options = { queryParams: {}, pathVariables: {} }) => {
  return requestData(url, 'DELETE', null, options);
};
