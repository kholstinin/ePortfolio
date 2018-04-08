import styled from 'styled-components';

const Button = styled.div`
  display: inline-block;
  padding: 0 10px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  margin-right: 15px;
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
`;

export const SRemoveBtn = Button.extend`
  background-color: red;
`;

export const SOpenBtn = Button.extend`
  background-color: green;
`;

export const SButtonWrapper = styled.div`
  margin-top: 10px;  
`;