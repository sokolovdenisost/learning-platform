export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: {
    photo_url: string;
    public_id: string;
  };
  _id: string;
}
