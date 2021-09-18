export class DeleteLessonDTO {
  course_id: string;
  lesson_id: string;
}

export class EditLessonDTO {
  course_id: string;
  lesson_id: string;
  array: Array<{ typeForm: string; text: string }>;
}

export class CreateLessonDTO {
  _id: string;
  array: Array<{ typeForm: string; text: string }>;
}

export class AddCommentIdLessonDTO {
  user: string;
  comment: string;
}
