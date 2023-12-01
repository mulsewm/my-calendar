import React from 'react';
import * as S from './Label.styles';


interface Label {
    text: string;
    color: string; 
  }
  

const Label: React.FC<Label> = ({ text, color }) => {
    return <S.LabelItem style={{ backgroundColor: color }}>{text}</S.LabelItem>;
};

export default Label;
