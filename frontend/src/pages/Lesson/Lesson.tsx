import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Button } from '../../components/Button/Button';
import { Comment } from '../../components/Comment/Comment';
import { Layout } from '../../components/Layout/Layout';
import { Link } from '../../components/Lesson/Link/Link';
import { Text } from '../../components/Lesson/Text/Text';
import { Title } from '../../components/Lesson/Title/Title';
import { Video } from '../../components/Lesson/Video/Video';
import { Loader } from '../../components/Loader/Loader';
import { Textarea } from '../../components/Textarea/Textarea';
import { ICourse } from '../../interfaces/course';
import { getCourse } from '../../store/actions/courseAction';
import { getLesson } from '../../store/actions/lessonAction';
import { Error404 } from '../404/404';
import './Lesson.scss';

export const Lesson = () => {
  const dispatch = useDispatch();
  const lesson = useSelector((state: any) => state.lesson.lesson);
  const loading = useSelector((state: any) => state.lesson.loading);
  const error = useSelector((state: any) => state.lesson.error);
  const params = window.location.pathname.split('/');

  useEffect(() => {
    dispatch(getLesson(params[2]));
  }, []);

  const mapBlocks = lesson.array.map((block: IBlock) => {
    if (block.typeForm === 'title') {
      return <Title key={block._id} title={block.text} />;
    } else if (block.typeForm === 'text') {
      return <Text key={block._id} text={block.text} />;
    } else if (block.typeForm === 'video') {
      const url = new URL(block.text).searchParams.get('v');
      return <Video key={block._id} url={String(url)} />;
    } else if (block.typeForm === '') {
    }
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error404 />;
  }

  return (
    <Layout>
      <div className="lesson-page">
        <div className="lesson-course-progress">
          <div className="course-progress-top">
            <div className="course-progress-title">{lesson.course.title}</div>
            <div className="course-progress-procent">90%</div>
          </div>
          <div className="course-progress-lines">
            <div className="course-progress-line-fullprocent" />
            <div className="course-progress-line-procent" />
          </div>
        </div>
        <div className="lesson-course-body">
          <div className="lesson-course-top-buttons">
            <Button type="outline" color="primary" fontSize="14">
              Watch another lesson
            </Button>
          </div>
          {mapBlocks}
          {/* <Title title="Test title in course" />
          <Text text="Lorem Ipsum - это текст-'рыба', часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной 'рыбой' для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum." />
          <Video url="https://www.youtube.com/embed/6x8Rt-9okB8" />
          <Text text="Lorem Ipsum - это текст-'рыба', часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной 'рыбой' для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum." />
          <Link url="/test" /> */}
          <div className="lesson-course-body-buttons">
            <Button type="bold" color="primary" fontSize="14">
              Next lesson
            </Button>
          </div>
        </div>
        <div className="lesson-course-comments">
          <div className="lesson-comments-top">
            <div className="lesson-comments-title">100.000 comments</div>
            <div className="lesson-comments-line" />
          </div>
          <div className="lesson-comments-body">
            <Textarea placeholder="Leave a comment" onChange={(e) => console.log(e)} />
            <div className="lesson-comments-buttons">
              <Button type="bold" color="primary" fontSize="14">
                Send comment
              </Button>
            </div>
          </div>
        </div>
        <div className="lesson-comments-all">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </Layout>
  );
};

interface IBlock {
  typeForm: string;
  text: string;
  _id: string;
}
