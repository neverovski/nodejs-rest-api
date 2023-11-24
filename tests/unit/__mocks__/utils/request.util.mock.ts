export const RequestUtilMock = {
  case1: {
    url: 'https://api.github.com/users/github',
    body: { login: 'github' },
    headers: { 'Content-Type': 'application/json' },
  },
  case2: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: { userId: 1, title: 'Title', body: 'Body' },
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  },
};
