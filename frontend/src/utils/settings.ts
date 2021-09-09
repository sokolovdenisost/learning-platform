import { API_URL } from '../consts';

export async function changePersonalData(body: IChangePersonalData): Promise<ISuccess | IError> {
  const _id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/settings/change-personal-data`, {
    method: 'POST',
    body: JSON.stringify({ ...body, _id }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();

  return result;
}

export async function changePassword(body: IChangePassword): Promise<ISuccess | IError> {
  const _id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/settings/change-password`, {
    method: 'POST',
    body: JSON.stringify({ ...body, _id }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();

  if (result.type === 'Success') {
    window.location.reload();
  }

  return result;
}

export async function changePhoto(body: any): Promise<ISuccess | IError | void> {
  const formData = new FormData();
  formData.append('file', body.photo.photo['0']);
  formData.append('user_id', body._id);

  const response = await fetch(`${API_URL}/settings/change-photo`, {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();

  if (result.type === 'Success') {
    window.location.reload();
  }

  return result;
}

interface IChangePersonalData {
  firstName: string;
  lastName: string;
  email: string;
}

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

interface IChangePhoto {
  _id: string;
  photo: FileList;
}

interface ISuccess {
  type: TypeResponse;
  code: number;
  text: string;
}

interface IError {
  type: TypeResponse;
  code: number;
  text: string;
}

type TypeResponse = 'Error' | 'Success';
