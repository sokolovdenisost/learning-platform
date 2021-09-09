export class ChangePersonalDataDTO {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

export class ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
  _id: string;
}

export class ChangePhotoDTO {
  user_id: string;
}
