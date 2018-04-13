import styled from 'styled-components';

const modalHeaderHeight = 40;
export const SModalHeader = styled.div`
  width: 100%;
  height: ${modalHeaderHeight}px;
  line-height: ${modalHeaderHeight}px;
  font-size: 15px;
  text-align: center;
  margin: 10px 0;
`;

export const SColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

export const SLabel = styled.div`
  width: 200px;
  margin-right: 5px;
`;

export const SSelectInputWrapper = styled.div`
  width: 100px;
`;