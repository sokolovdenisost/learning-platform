import { useEffect, useState } from 'react';
import { API_URL } from '../consts';

export const useAuth = (): AuthSuccess => {
  const [auth, setAuth] = useState<IUser>({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    _id: '',
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    fetch(`${API_URL}/auth`, {
      headers: {
        Authorization: `USER_ID ${user_id ? user_id : ''}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res._id) {
          setAuth(res);
          setLoading(false);
        } else if (res.type === 'Error') {
          setError(res);
          setLoading(false);
        }
      });
  }, []);

  return { loading, user: auth };
};

interface AuthSuccess {
  loading: boolean;
  user: IUser;
}

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  _id: string;
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
