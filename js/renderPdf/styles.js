import styled from 'styled-components';
import {dangerColor} from '../common/palette';

export const PdfWrapper = styled.div`
  width: ${props => props.width || 732}px;
  height: 100%;
  float: left;
`;

export const Control = styled.div`
  width: 300px;
  height: 100%;
  padding: 20px 0;
  float: left;
  font-size: 20px;
`;

export const ControlWrapper = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ControlItem = styled.li`
  margin-bottom: 10px;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MessageInput = styled.textarea.attrs({
  placeholder: 'Описание ошибки',
})`
  outline: ${props => props.err ? `1px solid ${dangerColor}` : 'none'};
  width: 100%;
  height: 60px;
  resize: none;
`;

const btnSize = 20;
export const BtnBlock = styled.div`
  display: flex
  justify-content: center;
  align-items: center;
  width: ${btnSize}px;
  height: ${btnSize}px;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const PageNumber = styled.div`
  width: 20px;
  text-align: center;
`;

export const PageControl = styled.div`
  width: 100%;
  display: flex
  flex-direction: row;
`;

export const Title = styled.div`
  font-size: 30px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #000;
  margin-bottom: 15px;
`;

export const SErrorBlock = styled.div`
  font-size: 18px;
  margin: 1em 0;
  color: ${dangerColor};    
`;