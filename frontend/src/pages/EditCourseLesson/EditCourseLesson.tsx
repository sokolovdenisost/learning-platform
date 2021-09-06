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
import { editLessonHandler } from '../../utils/course';

type TypesForm = 'video' | 'text' | 'test' | 'code' | 'title';

export const EditCourseLesson = () => {
  const [lesson, setLesson] = useState<ILesson>({
    array: [],
    _id: '',
    course: '',
  });

  useEffect(() => {
    const params = window.location.pathname.split('/');
    console.log(params[2], params[4]);

    fetch(`${API_URL}/course/${params[2]}/edit-lesson/${params[4]}`)
      .then((res) => res.json())
      .then((res) => {
        setLesson(res.lesson);
      });
  }, []);

  function createForm(typeForm: TypesForm) {
    setLesson({ ...lesson, array: [...lesson.array, { typeForm, text: '' }] });
  }

  function cancelForm(index: number) {
    console.log(index);
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

  return (
    <Layout title="Edit course lesson">
      <div className="edit-lesson-page">
        <div className="edit-lesson-forms">
          {mapCreateForms}
          <Panel onCreate={createForm} />
        </div>
        <div className="edit-lesson-buttons">
          <Button color="danger" type="bold" fontSize="14">
            Delete
          </Button>
          <Button color="primary" type="bold" fontSize="14" onClick={() => editLessonHandler(lesson)}>
            Save
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
