import React from 'react';
import { Block } from '../../components/Block/Block';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import './Create.scss';

export const Create = () => {
  return (
    <Layout title="Create course">
      <div className="create-page">
        <div className="left">
          <div className="create-item">
            <Block title="Main information on course" subtitle="In this block you  write main information on your course.">
              <ChangePicture title="Course picture" />
              <Input label="Name course" id="nameCourse" />
              <Input label="Description course" id="descriptionCourse" />
            </Block>
          </div>
        </div>
        <div className="rigth">
          <div className="create-item">
            <Block
              title="Characteristic about course"
              subtitle="Here you describe characteristic for course: how many lessons, who is the course for, Is there any certification.">
              <div className="course-inputs">
                <Input label="How many lessons" width={170} id="lessons" />
                <Input label="Is there any certification" width={170} id="certification" />
              </div>
              <Input label="For what level intended course" id="level" />
            </Block>
          </div>
        </div>
      </div>
    </Layout>
  );
};
