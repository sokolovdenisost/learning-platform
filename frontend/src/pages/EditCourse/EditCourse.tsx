import React, { useEffect, useState } from 'react';
import { Block } from '../../components/Block/Block';
import { Button } from '../../components/Button/Button';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { SearchTag } from '../../components/Tag/Tag';
import { API_URL } from '../../consts';
import './EditCourse.scss';

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

export const EditCourse = () => {
  const [course, setCourse] = useState<ICourse>({
    certificate: false,
    description: '',
    image: '',
    level: '',
    owner: '',
    tags: [],
    title: '',
  });
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    fetch(`${API_URL}/course/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCourse(res.course);
      });
  }, []);

  function selectedTags(e: React.MouseEvent<HTMLDivElement>) {
    const key = String(e.currentTarget.dataset.name);
    const findKey = course.tags.find((c) => c === key);
    if (findKey) {
      setCourse({ ...course, tags: course.tags.filter((c) => c !== key) });
    } else if (course.tags.length > 2) {
      course.tags.shift();
      setCourse({ ...course, tags: [...course.tags, key] });
    } else if (!findKey && course.tags.length < 3) {
      setCourse({ ...course, tags: [...course.tags, key] });
    }
  }

  function getSelected(title: string) {
    return course.tags.find((c) => c === title) ? true : false;
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.currentTarget.value);
  }

  return (
    <Layout title="Edit course">
      <div className="edit-course-page">
        <div className="edit-course-info">
          <div className="edit-course-left">
            <div className="edit-course-item">
              <Block title="Main information on course" subtitle="In this block you  write main information on your course.">
                <ChangePicture title="Course picture" img={course.image} />
                <Input label="Name course" id="title" value={course.title} onChange={(e) => onChangeHandler(e)} />
                <Input label="Description course" id="description" value={course.description} onChange={(e) => onChangeHandler(e)} />
              </Block>
            </div>
          </div>
          <div className="edit-course-right">
            <div className="edit-course-item">
              <Block
                title="Characteristic about course"
                subtitle="Here you describe characteristic for course: how many lessons, who is the course for, Is there any certification.">
                <div className="edit-course-inputs">
                  <Input label="How many lessons" width={170} id="lessons" onChange={(e) => onChangeHandler(e)} />
                  <Input
                    label="Is there any certification"
                    width={170}
                    id="certification"
                    value={course.certificate ? 'Yes' : 'No'}
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <Input label="For what level intended course" id="level" value={course.level} onChange={(e) => onChangeHandler(e)} />
              </Block>
            </div>
            <div className="edit-course-item">
              <Block title="Search details" subtitle="Here you set a minimum 1 tag (maximum of 3 tags) to make it easier to find the course.">
                <div className="edit-course-tags">
                  {TAGS.map((t) => {
                    return (
                      <SearchTag key={t} title={t} selected={getSelected(t)} onClick={(e: React.MouseEvent<HTMLDivElement>) => selectedTags(e)} />
                    );
                  })}
                </div>
              </Block>
            </div>
          </div>
        </div>
        <div className="edit-course-lessons">
          <div className="edit-course-lessons-top">
            <div className="edit-course-lessons-title">Lessons</div>
            <div className="edit-course-lessons-button">
              <Button type="outline" color="primary" fontSize="14">
                Add lesson
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface ICourse {
  certificate: boolean;
  description: string;
  image: string;
  level: string;
  owner: string;
  tags: string[];
  title: string;
}
