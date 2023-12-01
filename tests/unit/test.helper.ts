import fetchMock from 'jest-fetch-mock';

export const setupFetch = () => {
  fetchMock.enableMocks();
};
