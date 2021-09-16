import React, { useEffect, useState } from 'react';
import { Panel } from '../../components/Create/Panel/Panel';
import { Layout } from '../../components/Layout/Layout';
import { Text } from '../../components/Create/Text/Text';
import { Video } from '../../components/Create/Video/Video';
import { Title } from '../../components/Create/Title/Title';
import { Test } from '../../components/Create/Test/Test';
import { Code } from '../../components/Create/Code/Code';
import './CreateCourseLesson.scss';
import { Button } from '../../components/Button/Button';
import { createLesson } from '../../utils/lesson';
import { useHistory } from 'react-router';

type TypesForm = 'video' | 'text' | 'test' | 'code' | 'title';

export const CreateCourseLesson = () => {
  const [stepForm, setStepForm] = useState<StepForm[]>([]);
  const course_id = window.location.pathname.split('/')[2];
  const history = useHistory();

  function createForm(typeForm: TypesForm) {
    setStepForm([...stepForm, { typeForm, text: '' }]);
  }

  function cancelForm(index: number) {
    setStepForm([...stepForm.filter((_, idx) => index !== idx)]);
  }

  function setFormText(index: number, body: string) {
    stepForm[index] = {
      ...stepForm[index],
      text: body,
    };
  }

  const mapCreateForms = stepForm.map((form, index) => {
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
    <Layout title="Create course lesson">
      <div className="create-lesson-page">
        <div className="create-lesson-forms">{mapCreateForms}</div>
        <Panel onCreate={createForm} />
        <div className="create-lesson-buttons">
          <Button type="bold" color="cancel" fontSize="14" onClick={() => history.goBack()}>
            Cancel
          </Button>
          <Button type="bold" color="primary" fontSize="14" onClick={() => createLesson(stepForm, course_id)}>
            Create lesson
          </Button>
        </div>
      </div>
    </Layout>
  );
};

interface StepForm {
  [key: string]: any;
  typeForm: string;
  text: string;
}
