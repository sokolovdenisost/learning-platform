import { API_URL } from "../consts";

export async function registerHandler(data: IRegister): Promise<ISuccess | IError> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  const result = await response.json();
  return result;
}

export async function loginHandler(data: ILogin): Promise<any> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  const result = await response.json();

  if (result.type === "Success") {
    window.location.reload();
  }

  localStorage.setItem("token", result.access_token);

  return result;
}

export async function logoutHandler(): Promise<void> {
  localStorage.removeItem("user_id");
  localStorage.removeItem("token");
  window.location.reload();
}

interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
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

type TypeResponse = "Error" | "Success";
