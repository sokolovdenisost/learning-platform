import React from "react";
import "./Textarea.scss";

interface Props {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  maxHeight?: string;
  id?: string;
}

export const Textarea = ({ value, onChange, placeholder, maxHeight = "100%", id }: Props) => {
  return <textarea defaultValue={value} id={id} placeholder={placeholder} style={{ maxHeight }} onChange={(e) => onChange(e)}></textarea>;
};
