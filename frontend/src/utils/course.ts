import { API_URL } from '../consts';

export async function createCourseHandler(body: ICourse, file: any): Promise<any> {
  const formData = new FormData();
  console.log('test', body, file);

  for (let elem in body) {
    if (elem === 'tags') {
      formData.append(elem, JSON.stringify(body[elem]));
    } else {
      formData.append(elem, body[elem]);
    }
  }

  const user_id = localStorage.getItem('user_id');
  formData.append('_id', user_id + '');
  formData.append('file', file['0']);

  const response = await fetch(`${API_URL}/course/create`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (result.type === 'Success') {
    window.location.pathname = `edit/${result.course_id}`;
  }

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

  if (result.type === 'Success') {
    window.location.pathname = '/my-courses';
  }

  return result;
}

export async function editCourseHandler(body: ICourse, id: string): Promise<any> {
  const response = await fetch(`${API_URL}/course/edit-course/${id}`, {
    method: 'POST',
    body: JSON.stringify({ ...body }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  console.log(result);

  if (result.type === 'Success') {
    window.location.reload();
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

export async function favoriteCourseHandler(course_id: string): Promise<any> {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/course/favorite`, {
    method: 'POST',
    body: JSON.stringify({ course_id, user_id }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  console.log(result);

  // if (result.type === 'Success') {
  //   window.location.reload();
  // }

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

type LevelCourse = 'Trainee' | 'Junior' | 'Middle' | 'Senior';
