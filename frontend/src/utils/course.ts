import { API_URL } from '../consts';

export async function createCourseHandler(body: ICreateCourse): Promise<any> {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/course/create`, {
    method: 'POST',
    body: JSON.stringify({ ...body, _id: user_id }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (result.type === 'Success') {
    window.location.pathname = `edit/${result.course_id}`;
    console.log(window.location.href);
  }

  console.log(result);

  return result;
}

export async function deleteCourseHandler(id: string): Promise<any> {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/course/${id}`, {
    method: 'Post',
    body: JSON.stringify({ user_id }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  console.log(result);

  if (result.type === 'Success') {
    window.location.pathname = '/my-courses';
  }

  return result;
}

export async function createLesson(body: ILessonBody[], _id: string): Promise<any> {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/course/create-lesson`, {
    method: 'POST',
    body: JSON.stringify({ array: body, _id }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (result.type === 'Success') {
    window.location.pathname = `/edit/${_id}`;
  }

  return result;
}

export async function deleteLessonHandler(course_id: string, lesson_id: string): Promise<any> {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/course/delete-lesson`, {
    method: 'POST',
    body: JSON.stringify({ course_id, lesson_id }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (result.type === 'Success') {
    window.location.pathname = `/edit/${course_id}`;
  }

  return result;
}

export async function editLessonHandler(body: IEditLesson): Promise<any> {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/course/edit-lesson`, {
    method: 'POST',
    body: JSON.stringify({ course_id: body.course, lesson_id: body._id, array: body.array }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (result.type === 'Success') {
    window.location.reload();
  }

  return result;
}

interface ICreateCourse {
  image: string;
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

type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
