import { useEffect, useState } from 'react';
import { API_URL } from '../consts';

export const useAuth = () => {
  const [auth, setAuth] = useState<IUser>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/auth`)
      .then((res) => res.json())
      .then((res) => {
        if (res._id) {
          setAuth(res);
          setLoading(false);
        } else if (res.type === 'Error') {
          setError(res);
          setLoading(false);
        }
        console.log(res);
      });
  }, []);

  return { loading, auth };
};

// interface IAuth {
//   user: IUser
// }

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
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
