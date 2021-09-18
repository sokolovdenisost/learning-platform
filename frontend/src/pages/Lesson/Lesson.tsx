import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { Comment } from '../../components/Comment/Comment';
import { Layout } from '../../components/Layout/Layout';
import { Text } from '../../components/Lesson/Text/Text';
import { Title } from '../../components/Lesson/Title/Title';
import { Video } from '../../components/Lesson/Video/Video';
import { WatchAnotherLesson } from '../../components/Lesson/WatchAnotherLesson/WatchAnotherLesson';
import { Loader } from '../../components/Loader/Loader';
import { Textarea } from '../../components/Textarea/Textarea';
import { IState, IStateLesson } from '../../interfaces/state';
import { IUser } from '../../interfaces/user';
import { getLesson } from '../../store/actions/lessonAction';
import { addCommentInLessonHandler } from '../../utils/lesson';
import { Error404 } from '../404/404';
import './Lesson.scss';

export const Lesson = () => {
  const [comment, setComment] = useState('');
  const [active, setActive] = useState({
    type: '',
    active: false,
  });
  const dispatch = useDispatch();
  const { lesson, loading, error }: IStateLesson = useSelector((state: IState) => state.lesson);
  const user: IUser = useSelector((state: IState) => state.user.user);
  const params = window.location.pathname.split('/');
  const infoLesson = user.takeCourses.filter((course: any) => course.course === lesson.course._id);

  useEffect(() => {
    dispatch(getLesson(params[2]));
  }, []);

  function watchAnotherLessons() {
    setActive({ ...active, active: true });
  }

  function changeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.currentTarget.value);
  }

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

  const mapComments = lesson.comments
    .map((com: any) => {
      return <Comment info={com} key={com._id} />;
    })
    .reverse();

  if (error) {
    return <Error404 />;
  }

  if (loading) {
    return <Loader />;
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
            <Button type="outline" color="primary" fontSize="14" onClick={() => watchAnotherLessons()}>
              Watch another lesson
            </Button>
          </div>
          {mapBlocks}
          <div className="lesson-course-body-buttons">
            <Button type="bold" color="primary" fontSize="14">
              Next lesson
            </Button>
          </div>
        </div>
        <div className="lesson-course-comments">
          <div className="lesson-comments-top">
            <div className="lesson-comments-title">{lesson.comments.length} comments</div>
            <div className="lesson-comments-line" />
          </div>
          <div className="lesson-comments-body">
            <Textarea placeholder="Leave a comment" onChange={changeTextarea} />
            <div className="lesson-comments-buttons">
              <Button type="bold" color="primary" fontSize="14" onClick={() => addCommentInLessonHandler(params[2], comment)}>
                Send comment
              </Button>
            </div>
          </div>
        </div>
        <div className="lesson-comments-all">{mapComments}</div>
        {active.active ? (
          <WatchAnotherLesson currentLesson={infoLesson[0].currentLesson} course={lesson.course} active={active} setActive={setActive} />
        ) : null}
      </div>
    </Layout>
  );
};

interface IBlock {
  typeForm: string;
  text: string;
  _id: string;
}
