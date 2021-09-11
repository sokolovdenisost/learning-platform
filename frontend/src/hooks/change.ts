import React from 'react';

export const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>, state: any, setState: React.Dispatch<React.SetStateAction<any>>): void => {
  setState({ ...state, [e.currentTarget.id]: e.currentTarget.value });
};
