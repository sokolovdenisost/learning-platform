import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Block } from '../../components/Block/Block';
import { Button } from '../../components/Button/Button';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { LessonBlock } from '../../components/LessonBlock/LessonBlock';
import { SearchTag } from '../../components/Tag/Tag';
import { API_URL } from '../../consts';
import { deleteCourseHandler, editCourseHandler } from '../../utils/course';
import { Error404 } from '../404/404';
import { changeInputHandler } from '../../hooks/change';
import './EditCourse.scss';
import { ICourse } from '../../interfaces/course';
import { Select } from '../../components/Select/Select';

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
    _id: '',
    certificate: '',
    description: '',
    image: {
      photo_url: '',
      public_id: '',
    },
    level: '',
    owner: {
      _id: '',
      firstName: '',
      lastName: '',
    },
    tags: [],
    title: '',
    lessons: [],
  });
  const [error, setError] = useState();
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    fetch(`${API_URL}/course/edit/${id}/${user_id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.type === 'Error') {
          setError(res);
        } else {
          setCourse(res.course);
        }
        console.log(res);
      });
  }, []);

  function changeFile(e: React.ChangeEvent<HTMLInputElement>) {
    // setFile(e.currentTarget.files)
    console.log(e.currentTarget.files);
  }

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

  const mapLessons = course.lessons.map((lesson, index) => {
    return <LessonBlock _id={lesson._id} course={lesson.course} title={`Lesson #${index}`} key={index} />;
  });

  if (error) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout title="Edit course">
      <div className="edit-course-page">
        <div className="edit-course-info">
          <div className="edit-course-left">
            <div className="edit-course-item">
              <Block title="Main information on course" subtitle="In this block you  write main information on your course.">
                <ChangePicture title="Course picture" img={course.image.photo_url} onChange={changeFile} />
                <Input label="Name course" id="title" value={course.title} onChange={(e) => changeInputHandler(e, course, setCourse)} />
                <Input
                  label="Description course"
                  id="description"
                  value={course.description}
                  onChange={(e) => changeInputHandler(e, course, setCourse)}
                />
              </Block>
            </div>
          </div>
          <div className="edit-course-right">
            <div className="edit-course-item">
              <Block
                title="Characteristic about course"
                subtitle="Here you describe characteristic for course: how many lessons, who is the course for, Is there any certification.">
                <Select title="Certificate" id="certificate" options={['Yes', 'No']} />
                <Select title="Level" id="level" options={['Trainee', 'Junior', 'Middle', 'Senior']} />
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
              <a href={`/create/${course._id}/lesson`}>
                <Button type="bold" color="primary" fontSize="14">
                  Add lesson
                </Button>
              </a>
            </div>
          </div>
          <div className="edit-course-lessons-body">{mapLessons}</div>
        </div>
        <div className="edit-course-buttons">
          <Button type="bold" color="primary" fontSize="14" onClick={() => editCourseHandler(course, course._id)}>
            Save course
          </Button>
          <Button type="bold" color="danger" fontSize="14" onClick={() => deleteCourseHandler(course._id)}>
            Delete course
          </Button>
        </div>
      </div>
    </Layout>
  );
};
