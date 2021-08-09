import React, { useState } from 'react';
import { Block } from '../../components/Block/Block';
import { ChangePicture } from '../../components/ChangePicture/ChangePicture';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { SearchTag } from '../../components/Tag/Tag';
import './Create.scss';

const TAGS = [
  'Web-Design',
  'Design',
  'UI-Design',
  'UX-Design',
  'Web-development',
  'Front-end',
  'Back-end',
  'Mobile-development',
  'CMS',
  'Gamedev',
  'Testing',
];

export const Create = () => {
  const [selected, setSelected] = useState<string[]>([]);

  function selectedTags(e: React.MouseEvent<HTMLDivElement>) {
    const key = String(e.currentTarget.dataset.name);
    const findKey = selected.find((c) => c === key);
    if (findKey) {
      setSelected(selected.filter((c) => c !== key));
    } else if (selected.length > 2) {
      selected.shift();
      setSelected([...selected, key]);
    } else if (!findKey && selected.length < 3) {
      setSelected([...selected, key]);
    }
  }

  function getSelected(title: string) {
    return selected.find((c) => c === title) ? true : false;
  }

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
          <div className="create-item">
            <Block title="Search details" subtitle="Here you set a minimum 1 tag (maximum of 3 tags) to make it easier to find the course.">
              <div className="course-tags">
                {TAGS.map((t) => {
                  return <SearchTag key={t} title={t} selected={getSelected(t)} onClick={(e: React.MouseEvent<HTMLDivElement>) => selectedTags(e)} />;
                })}
              </div>
            </Block>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface Selected {
  selectedArray: string[];
  selectedObj: {
    [key: string]: boolean;
  };
}
