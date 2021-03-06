import { API_URL } from '../consts';

export async function createLesson(body: ILessonBody[], _id: string): Promise<any> {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/lesson/create-lesson`, {
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
  const response = await fetch(`${API_URL}/lesson/delete-lesson`, {
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

export async function editLessonHandler(body: any): Promise<any> {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/lesson/edit-lesson`, {
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

export async function addCommentInLessonHandler(lesson_id: string, comment: string): Promise<any> {
  const user_id = localStorage.getItem('user_id');
  if (comment.trim()) {
    const response = await fetch(`${API_URL}/lesson/${lesson_id}/add-comment`, {
      method: 'POST',
      body: JSON.stringify({ user: user_id, comment }),
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
}

interface ILessonBody {
  typeForm: string;
  text: string;
}
