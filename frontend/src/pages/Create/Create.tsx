import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Block } from '../../components/Block/Block';
import { Button } from '../../components/Button/Button';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { Notification } from '../../components/Notification/Notification';
import { Select } from '../../components/Select/Select';
import { Step } from '../../components/Step/Step';
import { SearchTag } from '../../components/Tag/Tag';
import { IState, IStateCourse } from '../../interfaces/state';
import { changeParams, goEmpty } from '../../store/actions/courseAction';
import { useTranslation } from 'react-i18next';
import { createCourseHandler } from '../../utils/course';
import './Create.scss';
import { IUser } from '../../interfaces/user';

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
  const { t } = useTranslation();
  const [file, setFile] = useState<any>({});
  const dispatch = useDispatch();
  const { course }: IStateCourse = useSelector((state: IState) => state.course);
  const [result, setResult] = useState({
    type: '',
    text: '',
    code: 0,
  });

  useEffect(() => {
    dispatch(goEmpty());
  }, []);

  function selectedTags(e: React.MouseEvent<HTMLDivElement>) {
    const key = String(e.currentTarget.dataset.name);
    const findKey = course.tags.find((c: string) => c === key);
    if (findKey) {
      dispatch(
        changeParams(
          'tags',
          course.tags.filter((c: string) => c !== key),
        ),
      );
    } else if (course.tags.length > 2) {
      course.tags.shift();
      dispatch(changeParams('tags', [...course.tags, key]));
    } else if (!findKey && course.tags.length < 3) {
      dispatch(changeParams('tags', [...course.tags, key]));
    }
  }

  function getSelected(title: string) {
    return course.tags.find((c: string) => c === title) ? true : false;
  }

  async function createCourse() {
    setResult({
      type: '',
      text: '',
      code: 0,
    });

    const result = await createCourseHandler(course, file.photo);

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
              <Input label="Name course" id="title" onChange={(e) => dispatch(changeParams(e.currentTarget.id, e.currentTarget.value))} />
              <Input
                label="Description course"
                id="description"
                onChange={(e) => dispatch(changeParams(e.currentTarget.id, e.currentTarget.value))}
              />
            </Block>
          </div>
        </div>
        <div className="rigth">
          <div className="create-item">
            <Block
              title="Characteristic about course"
              subtitle="Here you describe characteristic for course: how many lessons, who is the course for, Is there any certification.">
              <Select
                title="Certification"
                id="certificate"
                options={['Yes', 'No']}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(changeParams(e.currentTarget.id, e.currentTarget.value))}
              />
              <Select
                title="Level"
                id="level"
                options={['Trainee', 'Junior', 'Middle', 'Senior']}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(changeParams(e.currentTarget.id, e.currentTarget.value))}
              />
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
