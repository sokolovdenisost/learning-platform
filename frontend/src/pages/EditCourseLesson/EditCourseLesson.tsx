import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { API_URL } from '../../consts';
import { Text } from '../../components/Create/Text/Text';
import { Video } from '../../components/Create/Video/Video';
import { Title } from '../../components/Create/Title/Title';
import { Code } from '../../components/Create/Code/Code';
import { Test } from '../../components/Create/Test/Test';
import './EditCourseLesson.scss';
import { Button } from '../../components/Button/Button';
import { Panel } from '../../components/Create/Panel/Panel';
import { deleteLessonHandler, editLessonHandler } from '../../utils/course';
import { Redirect } from 'react-router';

type TypesForm = 'video' | 'text' | 'test' | 'code' | 'title';

export const EditCourseLesson = () => {
  const [lesson, setLesson] = useState<ILesson>({
    array: [],
    _id: '',
    course: '',
  });
  const [error, setError] = useState();
  const params = window.location.pathname.split('/');

  useEffect(() => {
    fetch(`${API_URL}/course/${params[2]}/edit-lesson/${params[4]}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.type === 'Success') {
          setLesson(res.lesson);
        } else {
          setError(res);
        }
      });
  }, []);

  function createForm(typeForm: TypesForm) {
    setLesson({ ...lesson, array: [...lesson.array, { typeForm, text: '' }] });
  }

  function cancelForm(index: number) {
    setLesson({ ...lesson, array: [...lesson.array.filter((_, idx) => index !== idx)] });
  }

  function setFormText(index: number, body: string) {
    lesson.array[index] = {
      ...lesson.array[index],
      text: body,
    };
  }

  const mapCreateForms = lesson.array.map((form, index) => {
    if (form.typeForm === 'text') {
      return <Text value={form.text} onChange={setFormText} index={index} onCancel={() => cancelForm(index)} key={index} />;
    }
    if (form.typeForm === 'video') {
      return <Video value={form.text} onChange={setFormText} index={index} onCancel={() => cancelForm(index)} key={index} />;
    }

    if (form.typeForm === 'title') {
      return <Title value={form.text} onChange={setFormText} index={index} onCancel={() => cancelForm(index)} key={index} />;
    }

    if (form.typeForm === 'test') {
      return <Test onChange={setFormText} index={index} onCancel={() => cancelForm(index)} key={index} />;
    }

    if (form.typeForm === 'code') {
      return <Code onChange={setFormText} index={index} onCancel={() => cancelForm(index)} key={index} />;
    }
  });

  if (error) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout title="Edit course lesson">
      <div className="edit-lesson-page">
        <div className="edit-lesson-forms">
          {mapCreateForms}
          <Panel onCreate={createForm} />
        </div>
        <div className="edit-lesson-buttons">
          <Button color="primary" type="bold" fontSize="14" onClick={() => editLessonHandler(lesson)}>
            Save
          </Button>
          <Button color="danger" type="bold" fontSize="14" onClick={() => deleteLessonHandler(params[2], params[4])}>
            Delete
          </Button>
        </div>
      </div>
    </Layout>
  );
};

interface ILesson {
  array: ILessonForm[];
  course: string;
  _id: string;
}

interface ILessonForm {
  typeForm: string;
  text: string;
}
