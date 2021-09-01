export interface IChangePersonalData {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  _id: string;
}
