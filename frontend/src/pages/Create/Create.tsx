import React, { useEffect, useState } from 'react';
import { Block } from '../../components/Block/Block';
import { Button } from '../../components/Button/Button';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { Step } from '../../components/Step/Step';
import { SearchTag } from '../../components/Tag/Tag';
import { createCourseHandler } from '../../utils/course';
import './Create.scss';

const TAGS = [
  'Web Design',
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
  const [form, setForm] = useState<IForm>({
    image:
      'https://images.unsplash.com/photo-1553272725-086100aecf5e?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: '',
    description: '',
    certificate: '',
    level: '',
    tags: [],
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

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <Layout title="Create course">
      <div className="create-page">
        <div className="left">
          <div className="create-item">
            <Block title="Main information on course" subtitle="In this block you  write main information on your course.">
              <ChangePicture title="Course picture" />
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
              <div className="course-inputs">
                <Input label="How many lessons" width={170} id="lessons" onChange={(e) => changeInput(e)} />
                <Input label="Is there any certification" width={170} id="certificate" onChange={(e) => changeInput(e)} />
              </div>
              <Input label="For what level intended course" id="level" onChange={(e) => changeInput(e)} />
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
            <Button type="bold" color="primary" fontSize="16" onClick={() => createCourseHandler(form)}>
              Create course
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface IForm {
  image: string;
  title: string;
  description: string;
  certificate: string;
  level: string;
  tags: string[];
}
