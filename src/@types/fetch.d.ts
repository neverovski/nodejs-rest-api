declare global {
  export const {
    fetch,
    FormData,
    Headers,
    Request,
    Response,
  }: typeof import('undici');

  // eslint-disable-next-line import/no-extraneous-dependencies
  export type {
    FormData,
    Headers,
    Request,
    RequestInit,
    Response,
  } from 'undici';
}
export {};
