type CurrentUser = {
  userId: number;
  email: string;
  role: string;
};

declare namespace Express {
  export interface Request {
    currentUser: CurrentUser;
    params: any;
  }
}
