import styled from 'styled-components';
import {dangerColor, successColor} from '../../common/palette';

export const SColumn = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid #000;
`;

export const SColumnHeader = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #000;
`;

export const SGroupColumn = SColumn.extend`
  width: 200px;
  border-left: none;
`;

export const SStudentsColumn = SColumn.extend`
  width: 300px;
`;

export const SDisciplinesColumn = SColumn.extend`
  width: 300px;
`;

export const SWorksColumn = SColumn.extend`
  width: 100%;
  border-right: none;
`;

export const SColumnItem = styled.div`
  margin-bottom: 5px;
  cursor: pointer;
`;

export const SRow = styled.div`
  display: flex;
  width: 100%;
  height: 650px;
  flex-direction: row;
`;

export const SWorkNumber = styled.span`
  color: ${props => props.verified ? successColor : dangerColor};  
`;