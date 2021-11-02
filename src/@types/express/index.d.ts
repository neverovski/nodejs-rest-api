type CurrentUser = {
  email: string;
  role: string;
  userId: number;
};

declare namespace Express {
  export interface Request {
    currentUser: CurrentUser;
    params: any;
  }
}
