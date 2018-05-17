import styled from 'styled-components';
import LeftMenu from '../../../components/tablePage/LeftMenu';
import Input from '../../../components/input/Input';

const hoverColor = '#eceff1';

export const SDisciplineListWrapper = LeftMenu.extend`

`;

export const SDisciplineList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
`;

export const SDisciplineListItem = styled.li`
  width: 100%;
  background-color: ${props => props.selected ? hoverColor : 'transparent'};
  text-align: center;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  
  &:hover {
    background-color: ${hoverColor};
  }
`;

export const SDisciplineListHeader = styled.div`
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
`;

export const SDisciplineListInputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15px;
`;

export const SDisciplineListInput = Input.extend`

`;

export const SDisciplineListInputClear = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 5px;
  top: 1px;
  cursor: pointer;
`;