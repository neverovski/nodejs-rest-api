/* eslint-disable camelcase */
export type GitHubResponse = {
  email?: string;
  html_url?: string;
  id: string;
  name?: string;
};

export enum GitHubInject {
  GITHUB_SERVICE = 'GitHubService',
}
