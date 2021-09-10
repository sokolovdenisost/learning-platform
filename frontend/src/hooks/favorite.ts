import { useAuth } from './auth';

export const useFavorite = (course_id: string): boolean => {
  const user = useAuth();
  if (user.user._id) {
    const check = user.user.favorites.filter((c) => c === course_id);

    return check.length ? true : false;
  }

  return false;
};
