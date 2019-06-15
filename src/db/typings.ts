export type IUser = {
  id: number;
  username: string;
  friends: Array<IUser>;
};

export type IPurchase = {
  buyer: IUser;
  payers: Array<IUser>;
};
