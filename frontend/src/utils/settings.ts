import { API_URL } from '../consts';

export async function changePersonalData(body: IChangePersonalData): Promise<any> {
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

interface IChangePersonalData {
  firstName: string;
  lastName: string;
  email: string;
}
