import React, { useState } from 'react';
import { useRef } from 'react';
import { BiEdit } from 'react-icons/bi';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { CreateBlock } from '../CreateBlock/CreateBlock';
import './Video.scss';

interface Props {
  onCancel: () => void;
  onChange: (index: number, body: string) => void;
  index: number;
}

interface IUrl {
  url: string;
  id: string | null;
}

export const Video = ({ onCancel, onChange, index }: Props) => {
  const [url, setUrl] = useState<IUrl>({
    url: '',
    id: '',
  });
  const [activeEdit, setActiveEdit] = useState(true);
  const [disable, setDisable] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl({ ...url, url: e.currentTarget.value });
    onChange(index, e.currentTarget.value);
    if (e.currentTarget.value.trim() && isUrl(e.currentTarget.value)) {
      const params = new URL(e.currentTarget.value).searchParams;
      if (params.get('v')) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else {
      setDisable(true);
    }
  }

  function isUrl(s: string) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
  }

  function onSave() {
    if (url) {
      const params = new URL(url.url).searchParams;
      setUrl({ ...url, id: params.get('v') });
      setActiveEdit(false);
    }
  }

  function onEdit() {
    setActiveEdit(true);
  }

  return (
    <div className="video">
      {activeEdit ? (
        <CreateBlock title="Video course" disable={disable} onSave={onSave} onCancel={onCancel}>
          <Input label="" id="video" onChange={(e) => changeInput(e)} />
        </CreateBlock>
      ) : (
        <div className="video-ready">
          <iframe ref={videoRef} width="100%" height="100%" style={{ minHeight: '100%' }} src={`https://www.youtube.com/embed/${url.id}`} />
          <div className="ready-edit" onClick={onEdit}>
            <BiEdit size={24} color="#007bff" />
          </div>
        </div>
      )}
    </div>
  );
};
