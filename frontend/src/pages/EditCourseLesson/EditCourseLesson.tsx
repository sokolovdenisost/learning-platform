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
import { deleteLessonHandler, editLessonHandler } from '../../utils/lesson';
import { Redirect } from 'react-router';
import { Error404 } from '../404/404';
import { useDispatch, useSelector } from 'react-redux';
import { changeLesson, getEditLesson } from '../../store/actions/lessonAction';
import { Loader } from '../../components/Loader/Loader';
import { IState, IStateLesson } from '../../interfaces/state';
import { IUser } from '../../interfaces/user';

type TypesForm = 'video' | 'text' | 'test' | 'code' | 'title';

export const EditCourseLesson = () => {
  const params = window.location.pathname.split('/');
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: IState) => state.user.user)
  const { lesson, loading, error }: IStateLesson = useSelector((state: IState) => state.lesson);

  useEffect(() => {
    dispatch(getEditLesson(user._id, params[4]));
  }, []);

  function createForm(typeForm: TypesForm) {
    dispatch(changeLesson('array', [...lesson.array, { typeForm, text: '' }]));
  }

  function cancelForm(index: number) {
    dispatch(changeLesson('array', [...lesson.array.filter((_: any, idx: number) => index !== idx)]));
  }

  function setFormText(index: number, body: string) {
    lesson.array[index] = { ...lesson.array[index], text: body };
    dispatch(changeLesson('array', [...lesson.array]));
  }

  const mapCreateForms = lesson.array.map((form: Form, index: number) => {
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
    return <Error404 />;
  }

  if (loading) {
    return <Loader />;
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

interface Form {
  typeForm: string;
  text: string;
}
