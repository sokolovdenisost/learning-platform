import React, { useEffect, useState } from 'react';
import { Block } from '../../components/Block/Block';
import { Button } from '../../components/Button/Button';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { Notification } from '../../components/Notification/Notification';
import { Select } from '../../components/Select/Select';
import { Step } from '../../components/Step/Step';
import { SearchTag } from '../../components/Tag/Tag';
import { createCourseHandler } from '../../utils/course';
import './Create.scss';

const TAGS = [
  'Web design',
  'Design',
  'UI Design',
  'UX Design',
  'Web development',
  'Front-end',
  'Back-end',
  'Mobile development',
  'CMS',
  'Gamedev',
  'Testing',
];

export const Create = () => {
  const [file, setFile] = useState<any>({});
  const [form, setForm] = useState<IForm>({
    image: [],
    title: '',
    description: '',
    certificate: '',
    level: '',
    tags: [],
  });
  const [result, setResult] = useState({
    type: '',
    text: '',
    code: 0,
  });

  function selectedTags(e: React.MouseEvent<HTMLDivElement>) {
    const key = String(e.currentTarget.dataset.name);
    const findKey = form.tags.find((c) => c === key);
    if (findKey) {
      setForm({ ...form, tags: form.tags.filter((c) => c !== key) });
    } else if (form.tags.length > 2) {
      form.tags.shift();
      setForm({ ...form, tags: [...form.tags, key] });
    } else if (!findKey && form.tags.length < 3) {
      setForm({ ...form, tags: [...form.tags, key] });
    }
  }

  function getSelected(title: string) {
    return form.tags.find((c) => c === title) ? true : false;
  }

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.currentTarget.id]: e.currentTarget.value });
  }

  async function createCourse() {
    setResult({
      type: '',
      text: '',
      code: 0,
    });

    const result = await createCourseHandler(form, file.photo);

    if (result.type === 'Error') {
      setResult(result);
    }

    setTimeout(
      () =>
        setResult({
          type: '',
          text: '',
          code: 0,
        }),
      5000,
    );
  }

  useEffect(() => {
    console.log(form);
    if (file.photo) {
      console.log(file.photo['0']);
    }
  }, [form, file]);

  function changeFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFile({ [e.currentTarget.id]: e.currentTarget.files });
  }

  return (
    <Layout title="Create course">
      <div className="create-page">
        <div className="left">
          <div className="create-item">
            <Block title="Main information on course" subtitle="In this block you  write main information on your course.">
              <ChangePicture
                title="Course picture"
                onChange={changeFile}
                img={
                  file.photo ? URL.createObjectURL(file.photo['0']) : 'https://speceurotech.by/upload/iblock/1ba/1ba350f7d1ffadc026daee2a85028106.jpg'
                }
              />
              <Input label="Name course" id="title" onChange={(e) => changeInput(e)} />
              <Input label="Description course" id="description" onChange={(e) => changeInput(e)} />
            </Block>
          </div>
        </div>
        <div className="rigth">
          <div className="create-item">
            <Block
              title="Characteristic about course"
              subtitle="Here you describe characteristic for course: how many lessons, who is the course for, Is there any certification.">
              <Select title="Certification" id="certificate" options={['Yes', 'No']} />
              <Select title="Level" id="level" options={['Trainee', 'Junior', 'Middle', 'Senior']} />
            </Block>
          </div>
          <div className="create-item">
            <Block title="Search details" subtitle="Here you set a minimum 1 tag (maximum of 3 tags) to make it easier to find the course.">
              <div className="course-tags">
                {TAGS.map((t) => {
                  return <SearchTag key={t} title={t} selected={getSelected(t)} onClick={(e: React.MouseEvent<HTMLDivElement>) => selectedTags(e)} />;
                })}
              </div>
            </Block>
          </div>
          <div className="create-course-buttons">
            <Button type="bold" color="primary" fontSize="16" onClick={createCourse}>
              Create course
            </Button>
          </div>
        </div>
        {result.type ? <Notification type={result.type} text={result.text} /> : null}
      </div>
    </Layout>
  );
};

interface IForm {
  image: any;
  title: string;
  description: string;
  certificate: string;
  level: string;
  tags: string[];
}
