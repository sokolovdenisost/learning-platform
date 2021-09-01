export interface ISuccess {
  type: TypeResponse;
  code: number;
  text: string;
}

export interface IError {
  type: TypeResponse;
  code: number;
  text: string;
}

type TypeResponse = 'Error' | 'Success';
