import { ICourse } from "../interfaces/course";

export const useFavorite = (user_id: string, course: ICourse): boolean => {
  if (user_id) {
    const check = course.favorites.filter((c) => c === user_id);

    return check.length ? true : false;
  }

  return false;
};
