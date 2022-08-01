/* eslint-disable camelcase */
export type GitHubProfile = {
  email?: string;
  html_url?: string;
  id: string;
  name?: string;
};

export enum GitHubInject {
  GITHUB_SERVICE = 'GitHubService',
}
