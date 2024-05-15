type SearchParameters = Record<string, any>;

const query: SearchParameters = {};

export const internalAPIFetch = $fetch.create({
  query,
  parseResponse: response => {
    return response ? JSON.parse(response) : response;
  },
  baseURL: "/lk/method"
});
