import { ICourse } from "../interfaces/course";
import { useAuth } from "./auth";

export const useFavorite = (course: ICourse): boolean => {
  const user_id = localStorage.getItem("user_id");

  if (user_id) {
    const check = course.favorites.filter((c) => c === user_id);

    return check.length ? true : false;
  }

  return false;
};
