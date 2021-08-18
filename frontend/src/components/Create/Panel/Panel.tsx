import React from 'react';
import { Button } from '../../Button/Button';
import './Panel.scss';

type TypesForm = 'video' | 'text' | 'test' | 'code' | 'title';

interface Props {
  onCreate: (type: TypesForm) => void;
}

export const Panel = ({ onCreate }: Props) => {
  return (
    <div className="panel">
      <Button type="bold" color="main" fontSize="18" onClick={() => onCreate('video')}>
        Video
      </Button>
      <Button type="bold" color="main" fontSize="18" onClick={() => onCreate('title')}>
        Title
      </Button>
      <Button type="bold" color="main" fontSize="18" onClick={() => onCreate('text')}>
        Text
      </Button>
      <Button type="bold" color="main" fontSize="18" onClick={() => onCreate('test')}>
        Test
      </Button>
      <Button type="bold" color="main" fontSize="18" onClick={() => onCreate('code')}>
        Code
      </Button>
    </div>
  );
};
