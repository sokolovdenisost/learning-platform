import { API_URL } from "../consts";

export async function createCourseHandler(body: ICourse, file: any): Promise<any> {
  const formData = new FormData();
  const user_id = localStorage.getItem("user_id");

  for (let elem in body) {
    if (elem === "tags") {
      formData.append(elem, JSON.stringify(body[elem]));
    } else if (elem !== "_id") {
      formData.append(elem, body[elem]);
    }
  }

  formData.append("_id", String(user_id));
  formData.append("file", file["0"]);

  const response = await fetch(`${API_URL}/course/create`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.type === "Success") {
    window.location.pathname = `edit/${result.course_id}`;
  }

  return result;
}

export async function deleteCourseHandler(id: string): Promise<any> {
  const user_id = localStorage.getItem("user_id");
  const response = await fetch(`${API_URL}/course/${id}`, {
    method: "Post",
    body: JSON.stringify({ user_id }),
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (result.type === "Success") {
    window.location.pathname = "/my-courses";
  }

  return result;
}

export async function editCourseHandler(body: ICourse, id: string, file: any): Promise<any> {
  const formData = new FormData();
  const user_id = localStorage.getItem("user_id");

  for (let elem in body) {
    if (elem === "tags") {
      formData.append(elem, JSON.stringify(body[elem]));
    } else if (elem === "title" || elem === "description" || elem === "certificate" || elem === "level") {
      formData.append(elem, body[elem]);
    }
  }
  if (file) {
    formData.append("file", file["0"]);
  }
  formData.append("user_id", String(user_id));

  const response = await fetch(`${API_URL}/course/edit-course/${id}`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.type === "Success") {
    window.location.reload();
  }

  return result;
}

export async function favoriteCourseHandler(course_id: string): Promise<any> {
  const user_id = localStorage.getItem("user_id");
  const response = await fetch(`${API_URL}/course/favorite`, {
    method: "POST",
    body: JSON.stringify({ course_id, user_id }),
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (result.type === "Success") {
    window.location.reload();
  }

  return result;
}

export async function setRatingForCourseHandler(course_id: string, rating: number): Promise<any> {
  const user_id = localStorage.getItem("user_id");
  const response = await fetch(`${API_URL}/course/rating/${course_id}`, {
    method: "POST",
    body: JSON.stringify({ rating, user: user_id }),
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
}

export async function joinCourseHandler(course_id: string): Promise<any> {
  const user_id = localStorage.getItem("user_id");
  const response = await fetch(`${API_URL}/course/join`, {
    method: "POST",
    body: JSON.stringify({ course_id, user_id }),
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (result.type === "Success" && result.text === "Joined the course") {
    window.location.pathname = "/my-courses";
  }

  return result;
}

export async function nextLessonHandler(course_id: string, lesson_id: string) {
  const user_id = localStorage.getItem("user_id");
  const response = await fetch(`${API_URL}/course/next-lesson`, {
    method: "POST",
    body: JSON.stringify({ course_id, user_id, lesson_id }),
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (result.type === "Success" && result.nextLessonId) {
    window.location.pathname = `/lesson/${result.nextLessonId}`;
  } else if (result.type === "Success" && (result.text === "Completed course" || "Course is already completed")) {
    window.location.pathname = "/my-courses";
  }

  console.log(result);

  return result;
}

interface ICourse {
  [key: string]: any;
  image: any;
  title: string;
  description: string;
  certificate: string;
  level: LevelCourse | string;
  tags: string[];
}

interface ILessonBody {
  typeForm: string;
  text: string;
}

interface IEditLesson {
  _id: string;
  course: string;
  array: Array<{ typeForm: string; text: string }>;
}

type LevelCourse = "Trainee" | "Junior" | "Middle" | "Senior";

// deletes dont use images
export async function test() {
  const response = await fetch(`${API_URL}/course/test`);

  const result = await response.json();

  console.log(result);

  return result;
}
