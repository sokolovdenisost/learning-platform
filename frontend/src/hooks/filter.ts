import { ICourse } from "../interfaces/course";
import { IUser } from "../interfaces/user";
import { Tags } from "../pages/Courses/Courses";

export const useFilter = (array: ICourse[], filterOptions: Tags): ICourse[] | null => {
  const filteredCourses = array.filter((course: ICourse) => checkTagsInCourse(course, filterOptions.Categories));

  if (!filterOptions.Categories.length && !filterOptions.Language.length && !filterOptions.Level.length) {
    return null;
  }

  return filteredCourses;
};

function checkTagsInCourse(course: ICourse, options: string[]): boolean {
  const array = course.tags.filter((tag) => options.includes(tag));

  console.log(array.length, options.length);

  if (options.length) {
    return array.length === options.length ? true : false;
  }

  return false;
}

function checkLevelInCourse(course: ICourse, options: string[]): boolean {
  return options.includes(course.level);
}
